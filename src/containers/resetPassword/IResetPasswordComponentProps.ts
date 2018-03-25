export interface IResetPasswordComponentProps {

  /**
   * Reset password
   *
   * @memberof IResetPasswordComponentProps
   */
  resetPassword?: (email: string) => any

  /**
   * Redirect to login page
   *
   * @memberof IResetPasswordComponentProps
   */
  loginPage?: () => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any
}
