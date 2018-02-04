import { Profile } from 'core/domain/users'

// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'

import { IAuthorizeService } from 'core/services/authorize'
import { User, UserProvider } from 'core/domain/users'
import { LoginUser, RegisterUserResult } from 'core/domain/authorize'
import { SocialError } from 'core/domain/common'

import { OAuthType } from 'core/domain/authorize/oauthType'
import moment from 'moment/moment'
import { injectable } from 'inversify'
/**
 * Firbase authorize service
 *
 * @export
 * @class AuthorizeService
 * @implements {IAuthorizeService}
 */
@injectable()
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
                  resolve(new LoginUser(result.uid, result.emailVerified))
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
                  const {uid, email} = signupResult
                  this.storeUserInformation(uid,email,user.fullName,'').then(resolve)
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
  public onAuthStateChanged: (callBack: (isVerifide: boolean, user: User) => void) => any = (callBack) => {
    firebaseAuth().onAuthStateChanged( (user: any) => {
      let isVerifide = false
      if (user) {
        if (user.emailVerified || user.providerData[0].providerId.trim() !== 'password') {
          isVerifide = true
        } else {
          isVerifide = false
        }
      }
      callBack(isVerifide,user)
    })
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

  /**
   * Send verfication email to user email
   *
   * @memberof AuthorizeService
   */
  public sendEmailVerification: () => Promise<void> = () => {
    return new Promise<void>((resolve,reject) => {
      let auth = firebaseAuth()
      const user = auth.currentUser

      if (user) {
        user.sendEmailVerification().then(() => {
          resolve()
        }).catch((error: any) => {
          // An error happened.
          reject(new SocialError(error.code, error.message))
        })
      } else {
        reject(new SocialError('authorizeService/nullException', 'User was null!'))
      }

    })
  }

  public loginWithOAuth: (type: OAuthType) => Promise<LoginUser> = (type) => {
    return new Promise<LoginUser>((resolve,reject) => {

      let provider: any

      switch (type) {
        case OAuthType.GITHUB:
          provider = new firebaseAuth.GithubAuthProvider()
          break
        case OAuthType.FACEBOOK:
          provider = new firebaseAuth.FacebookAuthProvider()
          break
        case OAuthType.GOOGLE:
          provider = new firebaseAuth.GoogleAuthProvider()
          break
        default:
          throw new SocialError('authorizeService/loginWithOAuth','None of OAuth type is matched!')
      }
      firebaseAuth().signInWithPopup(provider).then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        let token = result.credential.accessToken
        // The signed-in user info.
        const {user} = result
        const {credential} = result
        const {uid, displayName, email, photoURL} = user
        const {accessToken, providerId} = credential
        this.storeUserProviderData(uid,email,displayName,photoURL,providerId,accessToken)
        // this.storeUserInformation(uid,email,displayName,photoURL).then(resolve)
        resolve(new LoginUser(user.uid,true,providerId,displayName,email,photoURL))

      }).catch(function (error: any) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // The email of the user's account used.
        let email = error.email
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential

      })

    })
  }

  /**
   * Store user information
   *
   * @private
   * @memberof AuthorizeService
   */
  private storeUserInformation = (userId: string, email: string, fullName: string, avatar: string) => {
    return new Promise<RegisterUserResult>((resolve,reject) => {
      db.doc(`userInfo/${userId}`).set(
        {
          id: userId,
          state: 'active',
          avatar,
          fullName,
          creationDate: moment().unix(),
          email
        }
      )
      .then(() => {
        resolve(new RegisterUserResult(userId))
      })
      .catch((error: any) => reject(new SocialError(error.name, 'firestore/storeUserInformation : ' + error.message)))
    })
  }

  /**
   * Store user provider information
   *
   * @private
   * @memberof AuthorizeService
   */
  private storeUserProviderData = (
    userId: string,
    email: string,
    fullName: string,
    avatar: string,
    providerId: string,
    accessToken: string
  ) => {
    return new Promise<RegisterUserResult>((resolve,reject) => {
      db.doc(`userProviderInfo/${userId}`)
      .set(
        {
          userId,
          email,
          fullName,
          avatar,
          providerId,
          accessToken
        }
      )
      .then(() => {
        resolve(new RegisterUserResult(userId))
      })
      .catch((error: any) => reject(new SocialError(error.name, error.message)))
    })
  }
}
