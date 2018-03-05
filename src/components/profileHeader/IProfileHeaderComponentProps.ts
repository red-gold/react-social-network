export interface IProfileHeaderComponentProps {

    /**
     * Profile for current user {true} or not {false}
     *
     * @type {boolean}
     * @memberof IProfileHeaderComponentProps
     */
  isAuthedUser: boolean

  /**
   * Image cover address
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  banner: string

  /**
   * User full name
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  fullName: string

  /**
   * User tag line
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  tagLine: string

  /**
   * User's avatar address
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  avatar: string

  /**
   * Open edit profile dialog
   *
   * @memberof IProfileHeaderComponentProps
   */
  openEditor?: () => void

  /**
   * Number of user followers
   *
   * @type {number}
   * @memberof IProfileHeaderComponentProps
   */
  followerCount?: number

  /**
   * User identifier
   *
   * @type {string}
   * @memberof IProfileHeaderComponentProps
   */
  userId: string

  /**
   * Whether edit profile is open
   */
  editProfileOpen?: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
