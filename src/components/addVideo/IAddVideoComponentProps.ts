export interface IAddVideoComponentProps {

  /**
   * Whether add video modal is open
   */
  open: boolean

  /**
   * Handle close add video modal
   */
  onClose: any

  /**
   * On Add vido link
   */
  onAddLink: (url: string, videoThumbnails: string) => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

}
