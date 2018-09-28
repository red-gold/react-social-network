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
import { tieService } from '../circles/tieService'
import { Graph } from '../../domain/graphs'
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
 * Sync posts with algolia database
 */
const setFollowersCount = functions.https.onRequest(async (req, res) => {
    const userId = (req as any).user.uid
    const userGraphsDoc = await firestoreDB.collection('graphs:users').get()
    const graphList: Graph[] = []
    userGraphsDoc.forEach((graphDoc) => {
        const graphData = graphDoc.data() as Graph
        graphList.push(graphData)
    })
    const usersDoc = await firestoreDB.collection('userInfo').get()
    const batch = firestoreDB.batch()
    for (let userIndex = 0; userIndex < usersDoc.docs.length; userIndex++) {
        const userDoc = usersDoc.docs[userIndex]
        const userData = userDoc.data() as User
        const numberOfFollowers = graphList.filter((graph) => graph.rightNode === userData.userId).length
        batch.update(userDoc.ref, {followerCount: numberOfFollowers})
    }

    await batch.commit()
    res.status(HttpStatusCode.OK).json({})
})

/**
 * Map routing
 */
app.get('/api/admin/setup/user', setFollowersCount)

export const setup = functions.https.onRequest(app)
