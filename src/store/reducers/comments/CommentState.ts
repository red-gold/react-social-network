
import { Comment } from 'src/core/domain/comments'
import {Map} from 'immutable'
/**
 * Comment state
 *
 * @export
 * @class CommentState
 */
export class CommentState {

    /**
     * The list of comments on the posts
     */
  postComments: Map<string, {[commentId: string]: Comment}> = Map({})

  /**
   * Whether comment editor is open
   */
  editorStatus: Map<string, {[commentId: string]: boolean}> = Map({})

    /**
     * If the comments are loaded {true} or not {false}
     */
  loaded: Boolean = false
}
