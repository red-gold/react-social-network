import { Profile } from 'core/domain/users'

export interface IEditProfileComponentProps {

  /**
   * User profile
   *
   * @type {Profile}
   * @memberof IEditProfileComponentProps
   */
  info?: Profile

  /**
   * User profile banner addresss
   *
   * @type {string}
   * @memberof IEditProfileComponentProps
   */
  banner: string

  /**
   * User avatar address
   *
   * @type {string}
   * @memberof IEditProfileComponentProps
   */
  avatar: string

  /**
   * User full name
   *
   * @type {string}
   * @memberof IEditProfileComponentProps
   */
  fullName: string

  /**
   * Edit profile dialog is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof IEditProfileComponentProps
   */
  open?: boolean

  /**
   * Update user profile
   *
   * @memberof IEditProfileComponentProps
   */
  update?: (profile: Profile) => void

  /**
   * On edit profile dialog close event
   *
   * @memberof IEditProfileComponentProps
   */
  onRequestClose?: () => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  /**
   * Current locale language
   */
  currentLanguage?: string
}
