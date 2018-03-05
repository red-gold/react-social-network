
export interface IEditProfileComponentState {

  /**
   * Full name input value
   *
   * @type {string}
   * @memberof IEditProfileComponentState
   */
  fullNameInput: string

  /**
   * Full name input error message
   *
   * @type {string}
   * @memberof IEditProfileComponentState
   */
  fullNameInputError: string

  /**
   * Tag line input value
   *
   * @type {string}
   * @memberof IEditProfileComponentState
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
   *
   * @type {string}
   * @memberof IEditProfileComponentState
   */
  banner: string

  /**
   * User's avatar URL address
   *
   * @type {string}
   * @memberof IEditProfileComponentState
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
