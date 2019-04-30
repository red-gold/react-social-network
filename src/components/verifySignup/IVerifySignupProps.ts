import {Map} from 'immutable'
import { UserRegisterModel } from 'src/models/users'
export interface IVerifySignupProps {

  /**
   * Display error
   */
  showError?: (message: string) => any

    /**
     * Verify user registeration
     */
  verify?: (code: string) => any

    /**
     * Login
     */
  loginPage?: () => any

  /**
   * Signup request status
   */
  signupRequest?: Map<string, any>

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any
}
