import * as functions from 'firebase-functions'
import { adminDB, firestoreDB, searchClient, validateFirebaseIdToken } from '../../data/index'
import * as moment from 'moment'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { SocialError } from '../../domain/common/index'
import { Verification } from '../../domain/authorize/verification'
import { HttpStatusCode } from '../../data/httpStatusCode'
import { UserPermissionType } from '../../domain/common/userPermissionType'
import { PostIndex } from '../../domain/posts/postIndex'
import { Post } from '../../domain/posts/post'
import { User } from '../../domain/users'
import { UserIndex } from '../../domain/users/userIndex'
const request = require('request')
const cookieParser = require('cookie-parser')()

const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key

const app = express()
const cors = require('cors')({ origin: true })
app.disable('x-powered-by')
app.use(cors)
app.use(bodyParser.json())
app.use(cookieParser)
app.use(validateFirebaseIdToken)

/**
 * Sync users with algolia database
 */
const syncUsers = functions.https.onRequest(async (req, res) => {
    const userId = (req as any).user.uid

    const userCollection = await firestoreDB.collection('userInfo').get()
    console.log('userCollection', userCollection)
    const records = []
    for (let index = 0; index < userCollection.docs.length; index++) {
        const user = userCollection.docs[index].data() as User
        console.log('user', user)

        const indexUser = UserIndex.map(user)
        console.log('indexUser', indexUser)

        records.push({ ...indexUser })
    }
    console.log('indexUser', records)

    // Write to the algolia index
    const index = searchClient.initIndex('user')
    const indexing = await index.saveObjects(records)
    res.status(HttpStatusCode.OK).json({})

})

/**
 * Sync posts with algolia database
 */
const syncPosts = functions.https.onRequest(async (req, res) => {
    const userId = (req as any).user.uid

    const postCollection = await firestoreDB.collection('posts').get()
    const records = []
    for (let index = 0; index < postCollection.docs.length; index++) {
        const post = postCollection.docs[index].data() as Post
        const indexPost = PostIndex.map(post)
        records.push({ ...indexPost })
    }
    // Write to the algolia index
    const index = searchClient.initIndex('post')
    const indexing = await index.saveObjects(records)
    res.status(HttpStatusCode.OK).json({})
})

/**
 * Sync users with algolia database
 */
const changeUsers = functions.https.onRequest(async (req, res) => {
    const userId = (req as any).user.uid

    const userCollection = await firestoreDB.collection('userInfo').get()
    console.log('userCollection', userCollection)
    const batch = firestoreDB.batch()
    for (let index = 0; index < userCollection.docs.length; index++) {
        const userDoc = userCollection.docs[index]
        const user = userDoc.data()
        console.log('user', user)
        batch.update(userDoc.ref, {userId: user.id || user.userId, permission: UserPermissionType.Public , accessUserList: []})
    }
    await batch.commit()
    res.status(HttpStatusCode.OK).json({})

})

app.get('/api/admin/sync/user', syncUsers)
app.get('/api/admin/change/user', changeUsers)
app.get('/api/admin/sync/post', syncPosts)

export const syncAlgolia = functions.https.onRequest(app)
