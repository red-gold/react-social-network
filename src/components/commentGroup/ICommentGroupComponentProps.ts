import { User } from 'core/domain/users'
import { Comment } from 'core/domain/comments'
import { ServerRequestModel } from 'models/server'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import {Map} from 'immutable'
export interface ICommentGroupComponentProps {

  /**
   * Commnets
   */
  comments?: Map<string, Comment>

  /**
   * Commnets show on slide preview
   */
  commentSlides?: Map<string, Comment>

  /**
   * The post identifier which comment belong to
   */
  postId: string

  /**
   * Users` profile
   */
  userInfo?: Map<string, User>

  /**
   * Comment group is open {true} or not {false}
   */
  open: boolean

  /**
   * Comment is disabled {true} or not {false}
   */
  disableComments: boolean

  /**
   * Current user is the post owner {true} or not {false}
   */
  isPostOwner: boolean

  /**
   * User full name
   */
  fullName?: string

  /**
   * Avatar URL address
   */
  avatar?: string

  /**
   * Toggle comment list open/close
   */
  onToggleRequest: () => void

  /**
   * The identifier of post owner
   */
  ownerPostUserId: string

  /**
   * Send comment
   */
  send?: (commentText: string, postId: string, clearCommentWrite: () => void) => any

  /**
   * Get post comments request payload
   */
  commentsRequestStatus?: ServerRequestStatusType

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any

}
