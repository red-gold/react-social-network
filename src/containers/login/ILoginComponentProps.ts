import { OAuthType } from 'src/core/domain/authorize'
import {Map} from 'immutable'
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
   * Login request
   */
  loginRequest?: Map<string, any>

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
  t?: (state: any, param?: {}) => any
}
