// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'
import _ from 'lodash'

import { SocialError } from 'core/domain/common'
import { ICommentService } from 'core/services/comments'
import { Comment } from 'core/domain/comments'

/**
 * Firbase comment service
 *
 * @export
 * @class CommentService
 * @implements {ICommentService}
 */
export class CommentService implements ICommentService {
  public addComment: (comment: Comment)
    => Promise<string> = (comment) => {
      return new Promise<string>((resolve,reject) => {
        const postRef = db.doc(`posts/${comment.postId}`)
        let commentRef = postRef.collection('comments')
        commentRef.add(comment).then((result) => {
          resolve(result.id)

          /**
           * Add comment counter and three comments' slide preview
           */
          db.runTransaction((transaction) => {
            return transaction.get(postRef).then((postDoc) => {
              if (postDoc.exists) {
                const commentCount = postDoc.data().commentCounter + 1
                transaction.update(postRef, { commentCounter: commentCount })
                let comments = postDoc.data()
                if (!comments) {
                  comments = {}
                }
                if (commentCount < 4) {
                  transaction.update(postRef, { comments: { ...comments, [result.id]: comment } })
                } else {
                  let sortedObjects = comments
                       // Sort posts with creation date
                  sortedObjects.sort((a: any, b: any) => {
                    return parseInt(b.creationDate,10) - parseInt(a.creationDate,10)
                  })
                  const lastCommentId = Object.keys(sortedObjects)[2]
                  comments[lastCommentId] = {... comment}
                  transaction.update(postRef, { comments: { ...comments} })
                }
              }
            })
          })
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public getComments: (postId: string, callback: (resultComments: { [postId: string]: { [commentId: string]: Comment } }) => void)
    => void = (postId, callback) => {
      let commentsRef = db.doc(`posts/${postId}`).collection(`comments`)
      commentsRef.onSnapshot((snapshot) => {
        let parsedData: {[postId: string]: {[commentId: string]: Comment}} = {[postId]: {}}
        snapshot.forEach((result) => {
          parsedData[postId][result.id] = {
            id: result.id,
            ...result.data() as Comment
          }
        })
        if (callback) {
          callback(parsedData)
        }
      })
    }

  public updateComment: (comment: Comment)
    => Promise<void> = (comment) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const commentRef = db.doc(`posts/${comment.postId}/comments/${comment.id}`)

        batch.update(commentRef, comment)
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public deleteComment: (commentId: string, postId: string)
    => Promise<void> = (commentId, postId) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const postRef = db.doc(`posts/${postId}`)
        const commentRef = postRef.collection(`comments`).doc(commentId)

        batch.delete(commentRef)
        batch.commit().then(() => {
          resolve()

          /**
           * Delete comment counter and comments' slide preview
           */
          db.runTransaction((transaction) => {
            return transaction.get(postRef).then((postDoc) => {
              if (postDoc.exists) {
                const commentCount = postDoc.data().commentCounter - 1
                transaction.update(postRef, { commentCounter: commentCount })
                if (commentCount > 3) {
                  let comments = postDoc.data().comments
                  if (!comments) {
                    comments = {}
                  }
                  let parsedComments = {}
                  Object.keys(postDoc.data().comments).map((id) => {
                    if (id !== commentId) {
                      _.merge(parsedComments, { [id]: { ...comments[id] } })
                    }
                  })
                  transaction.update(postRef, { comments: { ...parsedComments}})
                }
              }
            })
          })
        })
          .catch((error: any) => {
            reject(new SocialError(error.code,error.message))
          })
      })
    }
}
