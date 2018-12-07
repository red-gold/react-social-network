import { User } from 'core/domain/users'
import {Map} from 'immutable'
import { Comment } from 'core/domain/comments'
import { postComments } from 'models/comments/commentTypes'

/**
 * Comment service interface
 *
 * @export
 * @interface ICommentService
 */
export interface ICommentService {

  addComment: (comment: Comment) => Promise<string>
  getComments: (postId: string, next: (resultComments: Map<string, Map<string, any>>) => void) => () => void
  updateComment: (comment: Comment) => Promise<void>
  deleteComment: (commentId: string) => Promise<void>

}
