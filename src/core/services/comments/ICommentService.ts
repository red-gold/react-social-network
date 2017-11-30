import { User } from 'core/domain/users'

import { Comment } from 'core/domain/comments'

/**
 * Comment service interface
 *
 * @export
 * @interface ICommentService
 */
export interface ICommentService {

  addComment: (comment: Comment) => Promise<string>
  getComments: (postId: string, callback: (resultComments: { [postId: string]: { [commentId: string]: Comment } }) => void) => void
  updateComment: (comment: Comment) => Promise<void>
  deleteComment: (commentId: string, postId: string) => Promise<void>

}
