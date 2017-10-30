import { Profile } from 'core/domain/users'
import { Comment } from 'core/domain/comments'
export interface ICommentGroupComponentProps {

  /**
   * Commnets
   *
   * @type {{[commentId: string]: Comment}}
   * @memberof ICommentGroupComponentProps
   */
  comments?: {[commentId: string]: Comment}

  /**
   * The post identifier which comment belong to
   *
   * @type {string}
   * @memberof ICommentGroupComponentProps
   */
  postId: string

  /**
   * Users` profile
   *
   * @type {{[userId: string]: Profile}}
   * @memberof ICommentGroupComponentProps
   */
  userInfo?: {[userId: string]: Profile}

  /**
   * Comment group is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICommentGroupComponentProps
   */
  open: boolean

  /**
   * Comment is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICommentGroupComponentProps
   */
  disableComments: boolean

  /**
   * Current user is the post owner {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICommentGroupComponentProps
   */
  isPostOwner: boolean

  /**
   * User full name
   *
   * @type {string}
   * @memberof ICommentGroupComponentProps
   */
  fullName?: string

  /**
   * Avatar URL address
   *
   * @type {string}
   * @memberof ICommentGroupComponentProps
   */
  avatar?: string

  /**
   * Toggle comment list open/close
   *
   * @type {Function}
   * @memberof ICommentGroupComponentProps
   */
  onToggleRequest: () => void

  /**
   * The identifier of post owner
   *
   * @type {string}
   * @memberof ICommentGroupComponentProps
   */
  ownerPostUserId: string

  /**
   * Send comment
   *
   * @type {(commentText: string, postId: string, clearCommentWrite: Function)}
   * @memberof ICommentGroupComponentProps
   */
  send?: (commentText: string, postId: string, clearCommentWrite: () => void) => any

}
