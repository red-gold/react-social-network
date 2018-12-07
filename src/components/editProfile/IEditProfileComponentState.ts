
export interface IEditProfileComponentState {

  [key: string]: any

  /**
   * Full name input value
   */
  fullNameInput: string

  /**
   * Full name input error message
   */
  fullNameInputError: string

  /**
   * Tag line input value
   */
  tagLineInput: string

  /**
   * Edit profile page is small size {true} or big {false}
   *
   * @type {boolean}
   * @memberof IEditProfileComponentState
   */
  isSmall: boolean

  /**
   * User's banner URL
   */
  banner: string

  /**
   * User's avatar URL address
   */
  avatar: string

  /**
   * Image gallery dialog is open for choosing banner image {true} or not {false}
   *
   * @type {boolean}
   * @memberof IEditProfileComponentState
   */
  openBanner: boolean

  /**
   * Image gallery dialog is open for choosing avatar image {true} or not {false}
   *
   * @type {boolean}
   * @memberof IEditProfileComponentState
   */
  openAvatar: boolean

  /**
   * Default birth day
   */
  defaultBirthday: any

  /**
   * Seleted birth day
   */
  selectedBirthday: number

  /**
   * Web URL
   */
  webUrl: string

  /**
   * User company name
   */
  companyName: string

  /**
   * User twitter id
   */
  twitterId: string

}
