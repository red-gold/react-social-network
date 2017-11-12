// - Import react components
import { firebaseRef, firebaseAuth } from 'data/firebaseClient'

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
  public addComment: (postId: string, comment: Comment)
    => Promise<string> = (postId, comment) => {
      return new Promise<string>((resolve,reject) => {
        let commentRef: any = firebaseRef.child(`postComments/${postId}`).push(comment)
        commentRef.then(() => {
          resolve(commentRef.key)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public getComments: (callback: (resultComments: { [postId: string]: { [commentId: string]: Comment } }) => void)
    => void = (callback) => {
      let commentsRef: any = firebaseRef.child(`postComments`)
      commentsRef.on('value', (snapshot: any) => {
        let comments: {[postId: string]: {[commentId: string]: Comment}} = snapshot!.val() || {}
        callback(comments)
      })
    }

  public updateComment: (commentId: string, postId: string, comment: Comment)
    => Promise<void> = (commentId, postId, comment) => {
      return new Promise<void>((resolve,reject) => {

        let updates: any = {}
        updates[`postComments/${postId}/${commentId}`] = comment
        firebaseRef.update(updates)
        .then(() => {
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

        let updates: any = {}
        updates[`postComments/${postId}/${commentId}`] = null
        firebaseRef.update(updates)
          .then(() => {
            resolve()
          })
          .catch((error: any) => {
            reject(new SocialError(error.code,error.message))
          })
      })
    }
}
