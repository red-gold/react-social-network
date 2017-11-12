// - Import react components
import { firebaseRef, firebaseAuth } from 'data/firebaseClient'

import { IAuthorizeService } from 'core/services/authorize'
import { User } from 'core/domain/users'
import { LoginUser, RegisterUserResult } from 'core/domain/authorize'
import { SocialError } from 'core/domain/common'

/**
 * Firbase authorize service
 *
 * @export
 * @class AuthorizeService
 * @implements {IAuthorizeService}
 */
export class AuthorizeService implements IAuthorizeService {

    /**
     * Login the user
     *
     * @returns {Promise<LoginUser>}
     * @memberof IAuthorizeService
     */
  public login: (email: string, password: string) => Promise<LoginUser> = (email, password) => {

    return new Promise<LoginUser>((resolve, reject) => {
      firebaseAuth()
                .signInWithEmailAndPassword(email, password)
                .then((result) => {
                  resolve(new LoginUser(result.uid))
                })
                .catch((error: any) => {
                  reject(new SocialError(error.code, error.message))
                })
    })
  }

    /**
     * Logs out the user
     *
     * @returns {Promise<void>}
     * @memberof IAuthorizeService
     */
  public logout: () => Promise<void> = () => {
    return new Promise<void>((resolve, reject) => {
      firebaseAuth()
                .signOut()
                .then((result) => {
                  resolve()
                })
                .catch((error: any) => {

                  reject(new SocialError(error.code, error.message))
                })
    })
  }

   /**
    * Register a user
    *
    * @returns {Promise<void>}
    * @memberof IAuthorizeService
    */
  public registerUser: (user: User) => Promise<RegisterUserResult> = (user) => {
    return new Promise<RegisterUserResult>((resolve, reject) => {
      firebaseAuth()
                .createUserWithEmailAndPassword(user.email as string, user.password as string)
                .then((signupResult) => {
                  firebaseRef.child(`users/${signupResult.uid}/info`)
                        .set({
                          ...user,
                          avatar: 'noImage'
                        })
                        .then((result) => {
                          resolve(new RegisterUserResult(signupResult.uid))
                        })
                        .catch((error: any) => reject(new SocialError(error.name, error.message)))
                })
                .catch((error: any) => reject(new SocialError(error.code, error.message)))
    })
  }

   /**
    * Update user password
    *
    * @returns {Promise<void>}
    * @memberof IAuthorizeService
    */
  public updatePassword: (newPassword: string) => Promise<void> = (newPassword) => {

    return new Promise<void>((resolve, reject) => {
      let user = firebaseAuth().currentUser
      if (user) {
        user.updatePassword(newPassword).then(() => {
                    // Update successful.
          resolve()
        }).catch((error: any) => {
                    // An error happened.
          reject(new SocialError(error.code, error.message))
        })
      }

    })
  }

  /**
   * On user authorization changed event
   *
   * @memberof IAuthorizeService
   */
  public onAuthStateChanged: (callBack: (user: User) => void) => any = (callBack) => {
    firebaseAuth().onAuthStateChanged(callBack)
  }

  /**
   * Reset user password
   *
   * @memberof AuthorizeService
   */
  public resetPassword: (email: string) => Promise<void> = (email) => {
    return new Promise<void>((resolve,reject) => {
      let auth = firebaseAuth()

      auth.sendPasswordResetEmail(email).then(function () {
        resolve()
      }).catch((error: any) => {
        // An error happened.
        reject(new SocialError(error.code, error.message))
      })
    })
  }
}
