import { Feed } from 'core/domain/common/feed'
import { ServerRequestModel } from 'models/server/serverRequestModel'
import { Profile } from 'core/domain/users'

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
  sendFeedbackRequest?: ServerRequestModel

  /**
   * Current user profile
   */
  currentUser?: Profile

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any

}
