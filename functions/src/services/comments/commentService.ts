
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB } from '../../data/index'
import { Comment } from '../../domain/comments/comment'
import * as _ from 'lodash'
import { Notification } from '../../domain/notifications/notification'
import { Post } from '../../domain/posts'
import { Profile } from '../../domain/users'
import { NotificationType } from '../../domain/notifications/notificationType'

/**
 * Add comment
 */
export const onAddComment = functions.firestore
  .document(`comments/{commentId}`)
  .onCreate(async (dataSnapshot, event) => {
    var newComment = dataSnapshot.data() as Comment
    const commentId: string = event.params.commentId
    if (newComment) {
      const postRef = firestoreDB.doc(`posts/${newComment.postId}`)

      // Get post
      var postId = newComment.postId
      /**
       * Increase comment counter and create three comments' slide preview
       */
      const postDoc = await postRef.get()
      if (!postDoc.exists) {
        return true
      }
      const postData = postDoc.data() as Post
      const batch = firestoreDB.batch()
      const commentCount = postData.commentCounter + 1
      batch.update(postRef, { commentCounter: commentCount })
      let comments = postData.comments
      if (!comments) {
        comments = {}
      }
      if (commentCount < 4) {
        batch.update(postRef, { comments: { ...comments, [commentId]: newComment } })
      } else {
        let sortedObjects = { ...comments, [commentId]: newComment }
        // Sort posts with creation date
        sortedObjects = _.fromPairs(_.toPairs(sortedObjects)
          .sort((a: any, b: any) => parseInt(b[1].creationDate, 10) - parseInt(a[1].creationDate, 10)).slice(0, 3))

        batch.update(postRef, { comments: { ...sortedObjects } })
      }

      const batch$ = batch.commit()

      if (newComment.userId === postData.ownerUserId) {
        const batchResult = await batch$
        return batchResult
      }

      /**
       * Send notification
       */
      const notificationRef = firestoreDB.doc(`users/${postData.ownerUserId}`).collection(`notifications`).doc()
      const notificationId = notificationRef.id
      const notifier = new Profile(newComment.userAvatar, newComment.userDisplayName, '', '', 0)
      notifier.userId = newComment.userId
      const notification = new Notification(
        notificationId,
        `Comment: ${newComment.text.substr(0, 60)} `,
        `/${postData.ownerUserId}/posts/${postId}`,
        dataSnapshot.createTime.seconds,
        notifier.userId,
        {...notifier},
        postData.ownerUserId,
        false,
        NotificationType.OnComment,
        commentId
      )
      const notifyRequest$ = notificationRef.set({ ...notification })

      const result = await Promise.all([batch$, notifyRequest$])
      return result
    }
  })

/**
 * Delete comment
 */
export const onDeleteComment = functions.firestore
  .document(`comments/{commentId}`)
  .onDelete((dataSnapshot, event) => {
    return new Promise((resolve, reject) => {
      const deletedComment = dataSnapshot.data() as Comment
      const commentId: string = event.params.commentId
      const postId: string = deletedComment.postId

      const postRef = firestoreDB.doc(`posts/${postId}`)
      firestoreDB.collection(`comments`)
        .where(`postId`, `==`, postId)
        .orderBy('creationDate', 'desc')
        .get().then((result) => {
          let parsedData: { [commentId: string]: Comment } = {}
          let index = 0
          result.forEach((comment) => {
            if (index < 3) {
              const commentData = comment.data() as Comment
              commentData.id = comment.id

              parsedData = {
                ...parsedData,
                [comment.id]: {
                  ...commentData
                }
              }

            }
            index++
          })
          postRef.update({ comments: parsedData, commentCounter: result.size })
            .then(() => {
              resolve()
            })
        }).catch(reject)
    })

  })
