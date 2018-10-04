export interface INewPasswordComponentProps {

  /**
   * Login user
   *
   * @memberof INewPasswordComponentProps
   */
  updatePassword?: (email: string, password: string) => any

  /**
   * Redirect to home page
   *
   * @memberof INewPasswordComponentProps
   */
  homePage?: () => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any

  /**
   * Whether logo is disabled
   */
  logoDisabled?: boolean

  /**
   * Whether footer is disabled
   */
  footerDisabled?: boolean
}
