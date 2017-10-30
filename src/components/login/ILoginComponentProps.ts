export interface ILoginComponentProps {

  /**
   * Login a user
   *
   * @memberof ILoginComponentProps
   */
  login?: (email: string , password: string) => any

  /**
   * Redirect to signup page
   *
   * @memberof ILoginComponentProps
   */
  signupPage?: () => any
}
