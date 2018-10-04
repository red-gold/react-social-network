export interface IImgCoverComponentProps {

  /**
   * Image file name
   */
  src: string

  /**
   * Handle click evenr
   */
  onClick?: (event?: any, obj?: any) => void

  /**
   * Image style 
   */
  style?: {}

  /**
   * Image with
   */
  width?: string

  /**
   * Image height
   */
  height?: string

  /**
   * Image border radius
   */
  borderRadius?: string

  /**
   * Class name
   */
  className?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
