import { User } from 'core/domain/users'

import { Comment } from 'core/domain/comments'

/**
 * Comment service interface
 *
 * @export
 * @interface ICommentService
 */
export interface ICommentService {

  addComment: (postId: string, comment: Comment) => Promise<string>
  getComments: (callback: (resultComments: { [postId: string]: { [commentId: string]: Comment } }) => void) => void
  updateComment: (userId: string, postId: string, comment: Comment) => Promise<void>
  deleteComment: (commentId: string, postId: string) => Promise<void>

}
