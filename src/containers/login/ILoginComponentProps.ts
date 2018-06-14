import { OAuthType } from 'src/core/domain/authorize'
export interface ILoginComponentProps {

  /**
   * Login a user
   *
   * @memberof ILoginComponentProps
   */
  login?: (email: string , password: string) => any

  /**
   * Login user with OAuth
   *
   * @memberof ILoginComponentProps
   */
  loginWithOAuth?: (type: OAuthType) => any

  /**
   * Redirect to signup page
   *
   * @memberof ILoginComponentProps
   */
  signupPage?: () => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any
}
