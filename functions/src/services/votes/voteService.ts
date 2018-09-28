
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB } from '../../data/index'
import { Vote } from '../../domain/votes'
import { Post } from '../../domain/posts'
import { Profile } from '../../domain/users/profile'
import { Notification } from '../../domain/notifications/notification'
import { NotificationType } from '../../domain/notifications/notificationType'

/**
 * Handle on add vote
 */
export const onCreateVote = functions.firestore.document('posts/{postId}/votes/{voteId}')
    .onCreate(async (dataSnapshot, event) => {
        const vote = dataSnapshot.data() as Vote
        const postId: string = event.params.postId
        const postRef = firestoreDB.doc(`posts/${postId}`)
        const postDoc = await postRef.get()
        if (!postDoc.exists) {
            return true
        }
        const postData = postDoc.data() as Post

        /**
         * Update post score score
         */

        let { votes, score } = postData
        if (!votes) {
            votes = {}
        }
        if (!score) {
            score = 0
        }
        votes[vote.userId] = true
        const newScore = Object.keys(votes).filter( item => votes[item] === true).length
        const postUpdated = { votes: { ...votes }, score: newScore}
        console.log('new Score ', newScore, postUpdated)
        const post$ =  postRef.update(postUpdated)
        if (vote.userId === postData.ownerUserId) {
            try {
            
                const transactionResult = await post$
                console.log(' Update vote create 1.')
                return transactionResult
                
            } catch (error) {
                return error
            }
        }

        /**
         * Update user vote count
         */
        const userInfoTransaction$ = new Promise<void>((resolve, reject) => {
            const userInfoRef = firestoreDB.collection('userInfo').doc(vote.userId)
            var transaction = firestoreDB.runTransaction(t => {
                return t.get(userInfoRef)
                    .then(doc => {
                        const voteCount = doc.data().voteCount
                        let newVoteCount = 1
                        if (voteCount && voteCount > 0) {
                            newVoteCount = voteCount + 1
                        }
                        t.update(userInfoRef, { voteCount: newVoteCount })
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
         * Send notification
         */
        const notificationRef = firestoreDB.doc(`users/${postData.ownerUserId}`).collection(`notifications`).doc()
        const notificationId = notificationRef.id
        const notifier = new Profile(vote.userAvatar, vote.userDisplayName, '', '', 0)
        const notificationBody = ((postData.body && postData.body.length > 0) ? postData.body.substr(0, 60) : ' liked your post') 
        console.log('vote', vote)
        console.log('notifier', notifier)
        console.log('postData', postData)
        notifier.userId = vote.userId
        const notification = new Notification(
            notificationId,
            `Like: ${notificationBody} `,
            `/${postData.ownerUserId}/posts/${postId}`,
            dataSnapshot.createTime.seconds,
            notifier.userId,
            { ...notifier },
            postData.ownerUserId,
            false,
            NotificationType.OnVote,
            postId
        )
        console.log('{ ...notification }', { ...notification })
        const notifyRequest$ = notificationRef.set({ ...notification })
        
        try {
            console.log(' Update vote create 2.')
            const result = await Promise.all([notifyRequest$, post$, userInfoTransaction$])
            return result
        } catch (error) {
            return error
        }
    })

/**
 * Handle on delete vote
 */
export const onDeleteVote = functions.firestore.document('posts/{postId}/votes/{voteId}')
    .onDelete(async (dataSnapshot, event) => {
        const vote = dataSnapshot.data() as Vote
        const postId: string = event.params.postId
        const postRef = firestoreDB.doc(`posts/${postId}`)

        /**
         * Update user post
         */
        const userInfoTransaction$ = new Promise<void>((resolve, reject) => {
            const userInfoRef = firestoreDB.collection('userInfo').doc(vote.userId)
            var transaction = firestoreDB.runTransaction(t => {
                return t.get(userInfoRef)
                    .then(doc => {
                        const voteCount = doc.data().voteCount
                        let newVoteCount = 0
                        if (voteCount && voteCount > 0) {
                            newVoteCount = voteCount - 1
                        }
                        t.update(userInfoRef, { voteCount: newVoteCount })
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
         * Update post
         */
        const postTransaction$ = firestoreDB.runTransaction((transaction) => {
            return transaction.get(postRef).then((postDoc) => {
                if (postDoc.exists) {
                    const post = postDoc.data() as Post
                    let { votes, score } = post
                    if (!votes) {
                        votes = {}
                    }
                    if (!score) {
                        score = 0
                    }
                    votes[vote.userId] = false
                    const newScore = Object.keys(votes).filter( item => votes[item] === true).length
                    console.log('Object.keys(votes).map( item => votes[item] === true', Object.keys(votes).filter( item => votes[item] === true))
                    console.log('newScore', newScore)
                    transaction.update(postRef, { votes: { ...votes }, score: newScore })
                }
            })
        })

        if (vote.receiverId) {
            const notification$ = firestoreDB.doc(`users/${vote.receiverId}`).collection(`notifications`)
                .where('type', '==', NotificationType.OnVote)
                .where('isSeen', '==', false)
                .where('targetId', '==', postId)
                .where('targetId', '==', postId)

            await Promise.all([userInfoTransaction$, postTransaction$, notification$])
            console.log(' Delete vote create 1.')
            
        } else {
            await Promise.all([userInfoTransaction$, postTransaction$])
            console.log(' Delete vote create 2.')

        }

    })