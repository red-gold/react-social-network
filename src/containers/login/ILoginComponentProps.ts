import { OAuthType } from 'src/core/domain/authorize'
import {Map} from 'immutable'
export interface ILoginComponentProps {

  /**
   * Login a user
   */
  login?: (email: string , password: string) => any

  /**
   * Login user with OAuth
   */
  loginWithOAuth?: (type: OAuthType) => any

  /**
   * Login request
   */
  loginRequest?: Map<string, any>

  /**
   * Redirect to signup page
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
