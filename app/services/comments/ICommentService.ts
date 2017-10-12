import { User } from 'domain/users'

import { Comment } from 'domain/comments'

/**
 * Comment service interface
 *
 * @export
 * @interface ICommentService
 */
export interface ICommentService {

  addComment: (postId: string, comment: Comment) => Promise<string>
  getComments: () => Promise< {[postId: string]: {[commentId: string]: Comment}} >
  updateComment: (userId: string, postId: string, comment: Comment) => Promise<void>
  deleteComment: (commentId: string, postId: string) => Promise<void>

}
