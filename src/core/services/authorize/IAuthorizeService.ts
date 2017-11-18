import { User } from 'core/domain/users'
import { LoginUser, RegisterUserResult, OAuthType } from 'core/domain/authorize'

/**
 * Authentication service interface
 *
 * @export
 * @interface IAuthorizeService
 */
export interface IAuthorizeService {

    /**
     * Login the user
     *
     * @returns {Promise<void>}
     * @memberof IAuthorizeService
     */
  login: (email: string, password: string) => Promise<LoginUser>

   /**
    * Logs out the user
    *
    * @returns {Promise<void>}
    * @memberof IAuthorizeService
    */
  logout: () => Promise<void>

    /**
     * @returns {Promise<void>}
     */
  updatePassword: (newPassword: string) => Promise<void>

    /**
     * @returns {Promise<void>}
     */
  registerUser: (user: User) => Promise<RegisterUserResult>

  /**
   * On user authorization changed event
   *
   * @memberof IAuthorizeService
   */
  onAuthStateChanged: (callBack: (isVerifide: boolean, user: User) => void) => void

  /**
   * Reset user password
   *
   * @memberof IAuthorizeService
   */
  resetPassword: (email: string) => Promise<void>

  /**
   * Send email verification
   *
   * @memberof IAuthorizeService
   */
  sendEmailVerification: () => Promise<void>

  /**
   * Login user by OAuth authentication
   *
   * @memberof IAuthorizeService
   */
  loginWithOAuth: (type: OAuthType) => Promise<LoginUser>
}
