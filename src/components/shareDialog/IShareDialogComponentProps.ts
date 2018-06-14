import { Post } from 'core/domain/posts'
import {Map} from 'immutable'

export interface IShareDialogComponentProps {

  /**
   * Whether share dialog is open
   */
  shareOpen: boolean

  /**
   * On close share dialog
   */
  onClose: () => void

  /**
   * Whether copy link is displayed
   */
  openCopyLink: boolean

  /**
   * On copy link
   */
  onCopyLink: () => void

  /**
   * The post object for sharing
   */
  post: Map<string, any>

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
