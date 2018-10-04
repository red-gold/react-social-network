import { User } from 'core/domain/users'

export interface IImageEditorComponentProps {

  /**
   * Whether add video modal is open
   */
  open: boolean

  /**
   * Handle close add video modal
   */
  onClose: any

  /**
   * Original photo URL
   */
  originalPhotoUrl: string

  /**
   * On Add vido link
   */
  onSetUrl: (url: string) => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Design theme
   */
  theme?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Handle progress bar
   */
  progress?: (percentage: number, status: boolean) => any

  /**
   * Show top loading
   */
  showTopLoading?: () => any

  /**
   * Hide top loading
   */
  hideTopLoading?: () => any

  /**
   * Save image data in database
   */
  saveImage?: (fileUrl: string) => any

  /**
   * Show error message
   */
  showError?: (error: string) => any

  /**
   * User information
   */
  currentUser?: User

}
