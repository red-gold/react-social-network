
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB, searchClient } from '../../data/index'
import { Comment } from '../../domain/comments/comment'
import * as express from 'express'
import { Post } from '../../domain/posts/post'
import { PostIndex } from '../../domain/posts'
import { PostType } from '../../domain/posts/postType'

const app = express()
app.disable('x-powered-by')

app.get('/:postId/comments', async (request, response) => {
    return response.status(200).send(`post`)

})

/**
 * Routing posts
 */
export const posts = functions.https.onRequest(app)

/**
 * Handle on add post
 */
export const onCreatePost = functions.firestore.document('posts/{postId}')
    .onCreate((dataSnapshot, event) => {
        const post = dataSnapshot.data() as Post
        /**
         *  Change counter
         */
        const changeCouter = new Promise<void>((resolve, reject) => {
            const postRef = firestoreDB.collection('userInfo').doc(post.ownerUserId)
            var transaction = firestoreDB.runTransaction(t => {
                return t.get(postRef)
                    .then(doc => {
                        const postCount = doc.data().postCount
                        let newPostCount = 1
                        if (postCount && postCount > 0) {
                            newPostCount = postCount + 1
                        }
                        t.update(postRef, { postCount: newPostCount })
                    })
            }).then(result => {
                console.log('Transaction success!')
                resolve()
            }).catch(err => {
                console.log('Transaction failure:', err)
                reject(err)
            })
        })

        /**
         *  Index post
         */

        // Write to the algolia index
        const index = searchClient.initIndex('post')
        const indexPost = PostIndex.map(post)
        const indexing = index.saveObject({ ...indexPost })

        return Promise.all([changeCouter, index])

    })

/**
 * Handle on add post
 */
export const onUpdatePost = functions.firestore.document('posts/{postId}')
    .onUpdate(async (dataSnapshot, event) => {
        const post = dataSnapshot.after.data() as Post
        /**
         *  Index post
         */

        // Write to the algolia index
        const index = searchClient.initIndex('post')
        post.id = event.params.postId
        const indexPost = PostIndex.map(post)
        const indexing = await index.saveObject({ ...indexPost })
        return indexing
    })

/**
 * Handle on delete post
 */
export const onDeletePost = functions.firestore.document('posts/{postId}')
    .onDelete(async (dataSnapshot, event) => {
        const post = dataSnapshot.data() as Post

        /**
         * Firestore transition delete post
         */
        const transition$ = new Promise<void>((resolve, reject) => {
            const postRef = firestoreDB.collection('userInfo').doc(post.ownerUserId)
            var transaction = firestoreDB.runTransaction(t => {
                return t.get(postRef)
                    .then(doc => {
                        const postCount = doc.data().postCount
                        let newPostCount = 0
                        if (postCount && postCount > 0) {
                            newPostCount = postCount - 1
                        }
                        t.update(postRef, { postCount: newPostCount })
                    })
            }).then(result => {
                console.log('Transaction success!')
                resolve()
            }).catch(err => {
                console.log('Transaction failure:', err)
                reject(err)
            })
        })

        /**
         * Search engine delete post
         */
        const index = searchClient.initIndex('post')
        const deletePostSearch$ = index.deleteObject(post.id)

        const promiseArray: any[] = [transition$, deletePostSearch$]
        
        if (post.postTypeId === PostType.Album) {
           const albumImageDocs = await firestoreDB.collection(`users`).doc(post.ownerUserId).collection('images')
            .where('albumId', '==', post.id).get()
            const batch = firestoreDB.batch()
            albumImageDocs.docs.forEach((imageDoc) => {
                batch.delete(imageDoc.ref)
            })
            const deleteAlbumImages$ = batch.commit()
            promiseArray.push(deleteAlbumImages$)
        }
        await Promise.all(promiseArray)
    })