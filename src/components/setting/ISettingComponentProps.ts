export interface ISettingComponentProps {

  /**
   * Login user
   *
   * @memberof ISettingComponentProps
   */
  login: (email: string, password: string) => any

  /**
   * Redirect to home page
   *
   * @memberof ISettingComponentProps
   */
  homePage: () => void
}
