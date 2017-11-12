export interface IRestPasswordComponentProps {

  /**
   * Reset password
   *
   * @memberof IRestPasswordComponentProps
   */
  resetPassword: (email: string) => any

  /**
   * Redirect to login page
   *
   * @memberof IRestPasswordComponentProps
   */
  loginPage: () => void
}
