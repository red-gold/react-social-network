export interface ISignupComponentProps {

  /**
   * Display error
   *
   * @memberof ISignupComponentState
   */
  showError?: (message: string) => any

    /**
     * Register user
     *
     * @memberof ISignupComponentState
     */
  register?: (data: any) => any

    /**
     * Login
     *
     * @memberof ISignupComponentState
     */
  loginPage?: () => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any
}
