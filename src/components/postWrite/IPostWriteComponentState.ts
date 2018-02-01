
export interface IPostWriteComponentState {

  /**
   * Post text
   */
  postText: string
  /**
   * The URL image of the post
   */
  image?: string
  /**
   * The path identifier of image on the server
   */
  imageFullPath: string
  /**
   * If it's true gallery will be open
   */
  galleryOpen: boolean
  /**
   * If it's true post button will be disabled
   */
  disabledPost: boolean
  /**
   * If it's true comment will be disabled on post
   */
  disableComments: boolean
  /**
   * If it's true share will be disabled on post
   */
  disableSharing: boolean,

  /**
   * Whether menu is open
   */
  menuOpen: boolean

}
