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
}
