export interface IPostComponentProps {

    /**
     * The context of a post
     */
  body: string
      /**
       * The number of comment on a post
       */
  commentCounter: number
      /**
       * Creation post date
       */
  creationDate: number
      /**
       * Post identifier
       */
  id: string
      /**
       * Post image address
       */
  image: string
      /**
       * The last time date when post has was edited
       */
  lastEditDate: number
      /**
       * The name of the user who created the post
       */
  ownerDisplayName: string
      /**
       * The identifier of the user who created the post
       */
  ownerUserId: string
    /**
     * The avatar address of the user who created the post
     * //TODO: User avatar should be as an attribute and [avatar] should be deleted
     */
  ownerAvatar: string
  /**
   * The avatar address of the user who created the post
   */
  avatar?: string
      /**
       * If post is only [0]text, [1]whith picture, ...
       */
  postTypeId: string
      /**
       * The number votes on a post
       */
  score: number
      /**
       * Array of tags on a post
       */
  tags: string[]
      /**
       * The video address of a post
       */
  video: string
      /**
       * If it's true comment will be disabled on a post
       */
  disableComments: boolean
      /**
       * If it's true sharing will be disabled on a post
       */
  disableSharing: boolean
      /**
       * The number of users who has visited the post
       */
  viewCount: boolean

  /**
   * User full name
   *
   * @type {string}
   * @memberof IPostComponentProps
   */
  fullName?: string

  /**
   * Number of comments on the post
   *
   * @type {number}
   * @memberof IPostComponentProps
   */
  commentCount?: number

  /**
   * Number of vote on a post
   *
   * @type {number}
   * @memberof IPostComponentProps
   */
  voteCount?: number

  /**
   * Current user vote the post {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPostComponentProps
   */
  userVoteStatus?: boolean

  /**
   * Current user is the owner of the post {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPostComponentProps
   */
  isPostOwner?: boolean

  /**
   * Vote a post
   *
   * @memberof IPostComponentProps
   */
  vote?: () => any

  /**
   * Delete a vote on the post
   *
   * @memberof IPostComponentProps
   */
  unvote?: () => any

  /**
   * Delte a post
   *
   * @memberof IPostComponentProps
   */
  delete?: (id: string) => any

  /**
   * Toggle comment disable/enable
   *
   * @memberof IPostComponentProps
   */
  toggleDisableComments?: (status: boolean) => any

  /**
   * Toggle sharing disable/enable
   *
   * @memberof IPostComponentProps
   */
  toggleSharingComments?: (status: boolean) => any

  /**
   * Redirect to {url} route
   *
   * @memberof IPostComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Set tile of top bar
   *
   * @memberof IPostComponentProps
   */
  setHomeTitle?: (title: string) => any
}
