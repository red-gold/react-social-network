export interface IImgCoverComponentProps {

  /**
   * Image file name
   *
   * @type {string}
   * @memberof IImgCoverComponentProps
   */
  fileName: string

    /**
     * Image style sheet
     *
     * @type {{}}
     * @memberof IImgCoverComponentProps
     */
  style?: {}

  /**
   * Image with
   *
   * @type {string}
   * @memberof IImgCoverComponentProps
   */
  width?: string

  /**
   * Image height
   *
   * @type {string}
   * @memberof IImgCoverComponentProps
   */
  height?: string

  /**
   * Image border radius
   *
   * @type {string}
   * @memberof IImgCoverComponentProps
   */
  borderRadius?: string

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
