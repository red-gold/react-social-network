export interface IImgComponentProps {

  /**
   * Image file name
   */
  fileName: string

  /**
   * Image style sheet
   */
  style?: {}

  /**
   * Handle click event
   */
  onClick?: (event: any) => void 

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

}
