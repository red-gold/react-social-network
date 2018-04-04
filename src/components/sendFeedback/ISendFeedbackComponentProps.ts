import { Feed } from 'core/domain/common/feed'
import { ServerRequestModel } from 'models/server/serverRequestModel'
import { Profile } from 'core/domain/users'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export interface ISendFeedbackComponentProps {
  /**
   * Whether send feedback is diplayed
   */
  sendFeedbackStatus?: boolean

  /**
   * Send feedback
   */
  sendFeed?: (feed: Feed) => any

  /**
   * Hide feedback form
   */
  hideFeedback?: () => any

  /**
   * The server request of send feedback
   */
  sendFeedbackRequestType?: ServerRequestStatusType

  /**
   * Current user profile
   */
  currentUser?: Profile

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any

}
