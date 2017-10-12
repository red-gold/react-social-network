// - Import react components
import { firebaseRef, firebaseAuth } from 'app/firebase/'

import { SocialError } from 'domain/common'
import { ICommentService } from 'services/comments'
import { Comment } from 'domain/comments'

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

  public getComments: ()
    => Promise<{ [postId: string]: { [commentId: string]: Comment } }> = () => {
      return new Promise<{ [postId: string]: { [commentId: string]: Comment }}>((resolve,reject) => {
        let commentsRef: any = firebaseRef.child(`postComments`)
        commentsRef.on('value', (snapshot: any) => {
          let comments: {[postId: string]: {[commentId: string]: Comment}} = snapshot!.val() || {}
          resolve(comments)
        })
      })
    }

  public updateComment: (userId: string, postId: string, comment: Comment)
    => Promise<void> = (userId, postId, comment) => {
      return new Promise<void>((resolve,reject) => {

        let updates: any = {}
        updates[`postComments/${postId}/${userId}`] = comment
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
