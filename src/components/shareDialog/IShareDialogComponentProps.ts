import { Post } from 'core/domain/posts'

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
  post: Post

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
