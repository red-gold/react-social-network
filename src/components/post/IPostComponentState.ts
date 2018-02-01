
export interface IPostComponentState {

    /**
     * Post text
     */
  text: string
      /**
       * It's true if whole the text post is visible
       */
  readMoreState: boolean
      /**
       * Handle open comment from parent component
       */
  openComments: boolean
      /**
       * If it's true, share dialog will be open
       */
  shareOpen: boolean
      /**
       * If it's true comment will be disabled on post
       */
  disableComments: boolean
      /**
       * If it's true share will be disabled on post
       */
  disableSharing: boolean
      /**
       * Title of share post
       */
  shareTitle: string
      /**
       * If it's true, post link will be visible in share post dialog
       */
  openCopyLink: boolean
      /**
       * If it's true, post write will be open
       */
  openPostWrite: boolean

  /**
   * Open the comment group
   */
  openCommentGroup?: () => void

  /**
   * Post menu anchor element
   */
  postMenuAnchorEl?: any

  /**
   * Whether post menu open
   */
  isPostMenuOpen?: boolean
}
