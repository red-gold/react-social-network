import axios from 'axios';
import { LoginUser, RegisterUserResult } from 'core/domain/authorize';
import { OAuthType } from 'core/domain/authorize/oauthType';
import { UserClaim } from 'core/domain/authorize/userClaim';
import { SocialError } from 'core/domain/common';
import { IAuthorizeService } from 'core/services/authorize';
import { db, firebaseAuth } from 'data/firestoreClient';
import { inject, injectable } from 'inversify';
import jwtDecode from 'jwt-decode';
import { UserRegisterModel } from 'models/users/userRegisterModel';
import config from 'src/config';
import { IHttpService } from 'src/core/services/webAPI';
import { SocialProviderTypes } from 'src/core/socialProviderTypes';
import { AuthKeywordsEnum } from 'src/models/authorize/authKeywordsEnum';


// - Import react components
/**
 * Firbase authorize service
 */
@injectable()
export class AuthorizeService implements IAuthorizeService {
  
  @inject(SocialProviderTypes.Httpervice) private _httpService: IHttpService
  constructor(
  ) {
  }
  /**
   * Login the user
   */
  public login = (email: string, password: string) => {

    return new Promise<LoginUser | null>((resolve, reject) => {
      axios.post(`${config.settings.api}login`, {
        userName: email,
        password: password
      })
        .then(({ data }) => {
          this.loginByToken(data.token).then((user) => {
            resolve(user)
          })
        })
        .catch((error: any) => {
          const responseError = error.response.data
          reject(new SocialError(responseError._code || responseError.code, responseError._message || responseError.message))
        })
    })
  }

  /**
   * Login user by token
   */
  public async loginByToken(token: string) {

    try {
      const authedUser = await firebaseAuth().signInWithCustomToken(token)
      if (authedUser) {
        const user = authedUser.user!
        const idToken = await user.getIdToken()
        localStorage.setItem('red-gold.scure.token', idToken)
        if (authedUser) {
          const loginUser = new LoginUser(
            user.uid,
            user.emailVerified,
            user.providerId,
            user.displayName!,
            user.email!,
            user.photoURL!,
            (jwtDecode(token) as any).claims.phoneVerified
          )
          return loginUser
        }

        
      }
      return null

    } catch (error) {
      // Handle Errors here.
      throw new SocialError(error.code, error.message)
    }

  }

  /**
   * Logs out the user
   */
  public logout: () => Promise<void> = () => {
    return new Promise<void>((resolve, reject) => {
      firebaseAuth()
        .signOut()
        .then((result) => {
          localStorage.removeItem('red-gold.scure.token')
          resolve()
        })
        .catch((error: any) => {

          reject(new SocialError(error.code, error.message))
        })
    })
  }

  /**
   * Register a user
   */
  public getUserRegisterToken = async (user: UserRegisterModel, captchaVerifier: string) => {
    try {
      const token =  await this._httpService.postWithoutAuth(`user-register-token`, {
        user: {...user},
        verifyType: config.settings.verificationType,
        'g-recaptcha-response': captchaVerifier
      })
      return token[AuthKeywordsEnum.TokenVerificaitonSecretData]
    } catch (error) {
      throw new SocialError(error.code, error.message)
    }
  }

  /**
   * Verify user register code
   */
  public verifyUserRegisterCode = async (code: string, registerToken: string) => {
    try {
      const token =  this._httpService.postWithoutAuth(`verify-register-user`, {
        code,
        [AuthKeywordsEnum.TokenVerificaitonSecretData]: registerToken
      })
      return token
    } catch (error) {
      throw new SocialError(error.code, error.message)
    }
  }

  /**
   * Register a user
   */
  public registerUser = async (user: UserRegisterModel) => {
    try {
      const signupResult = await firebaseAuth()
        .createUserWithEmailAndPassword(user.email as string, user.password as string)
        
          const { uid, email } = signupResult.user!
          const result = await this.storeUserInformation(uid, email!, user.fullName, '', user.email!, user.password!)
          return result
    } catch (error) {
      throw new SocialError(error.code, error.message)
    }
  }

  /**
   * Whether user is login or not
   */
  public isUserUserVerified() {
    let phoneVerified = false
    const token = localStorage.getItem('red-gold.scure.token')
    if (token) {
      phoneVerified = (jwtDecode(token) as any).claims.phoneVerified
    }
    return phoneVerified
  }

  /**
   * Update user password
   */
  public updatePassword: (newPassword: string, confirmPassword: string) => Promise<void> = (newPassword, confirmPassword) => {

    return new Promise<void>((resolve, reject) => {
      let user = firebaseAuth().currentUser

      if (user) {
        firebaseAuth().currentUser!.getIdToken().then((tokenId) => {
          axios.post(`${config.settings.api}update-password`, {
            newPassword,
            confirmPassword
          }, {
              headers: { 'authorization': `Bearer ${tokenId}` }
            })
            .then(({ data }) => {
              resolve(data.verifyId)
            })
            .catch((error) => reject(new SocialError(error.code, `authorizeSerive/UpdatePassword`)))
        })
          .catch((error: any) => reject(new SocialError(error.code, `authorizeSerive/TokenError`)))
      }

    })
  }

  /**
   * Get id token
   */
  public getUserClaim = (currentUser?: any) => {
    return new Promise<UserClaim>((resolve, reject) => {
      currentUser.getIdTokenResult().then((result: any) => {
        const { claims } = result

        resolve(new UserClaim(
          currentUser.displayName,
          currentUser.email,
          currentUser.emailVerified,
          currentUser.isAnonymous,
          currentUser.metadata,
          currentUser.phoneNumber,
          currentUser.photoURL,
          currentUser.providerData,
          currentUser.providerId,
          currentUser.refreshToken,
          currentUser.uid,
          claims.phoneVerified
        ))
      })
        .catch((error: any) => reject(new SocialError(error.code, `authorizeSerive/TokenError`)))

    })

  }

  /**
   * On user authorization changed event
   */
  public onAuthStateChanged: (callBack: (user: UserClaim) => void) => any = (callBack) => {
    return firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          localStorage.setItem('red-gold.scure.token', idToken)
        })

      }
      callBack(user as any)
    })
  }

  /**
   * Reset user password
   */
  public resetPassword: (email: string) => Promise<void> = (email) => {
    return new Promise<void>((resolve, reject) => {
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
   */
  public sendEmailVerification = async (value: any) => {
    const currentUser = firebaseAuth().currentUser
    if (currentUser) {
      const tokenId = await currentUser.getIdToken()
      try {
        const result = await axios.post(`${config.settings.api}email-verification`, {
          'g-recaptcha-response': value
        }, {
            headers: { 'authorization': `Bearer ${tokenId}` }
          })
        return result.data.verifyId
      } catch (error) {
        console.trace('error', error)
        throw new SocialError(error.code, `authorizeSerive/sendEmailVerification`)
      }

    }
  }

  public loginWithOAuth: (type: OAuthType) => Promise<LoginUser> = (type) => {
    return new Promise<LoginUser>((resolve, reject) => {

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
          throw new SocialError('authorizeService/loginWithOAuth', 'None of OAuth type is matched!')
      }
      firebaseAuth().signInWithPopup(provider).then((result) => {
        const user = result.user!

        const { credential } = result
        const { uid, displayName, email, photoURL } = user
        const { providerId } = credential!
        this.storeUserProviderData(uid, email!, displayName!, photoURL!, providerId, 'No Access Token')
        // this.storeUserInformation(uid,email,displayName,photoURL).then(resolve)
        resolve(new LoginUser(user.uid, true, providerId, displayName!, email!, photoURL!))

      }).catch(function (error: any) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // The email of the user's account used.
        let email = error.email
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential
        return {
          errorCode,
          errorMessage,
          email,
          credential
        }
      })

    })
  }

  /**
   * Send sms verfication
   */
  public sendSmsVerification = (phoneNumber: string, value: any) => {
    return new Promise<string>((resolve, reject) => {
      const currentUser = firebaseAuth().currentUser
      if (currentUser) {
        currentUser.getIdToken().then((tokenId) => {
          axios.post(`${config.settings.api}sms-verification`, {
            phoneNumber,
            'g-recaptcha-response': value
          }, {
              headers: { 'authorization': `Bearer ${tokenId}` }
            })
            .then(({ data }) => {
              resolve(data.verifyId)
            })
        })
          .catch((error: any) => reject(new SocialError(error.code, `authorizeSerive/TokenError`)))
      }

    })

  }

  /**
   * Send email verfication
   */
  public sendResetPasswordVerification = (email: string, value: any) => {
    return new Promise<string>((resolve, reject) => {
      axios.post(`${config.settings.api}email-verification-code`, {
        email,
        'g-recaptcha-response': value
      })
        .then(({ data }) => {
          resolve(data.verifyId)
        })
        .catch((error) => {
          const responseError = error.response.data
          reject(new SocialError(responseError._code || responseError.code, responseError._message || responseError.message))

        })

    })

  }

  /**
   * Confirm phone code verfication 
   */
  public confirmVerificationPhone = (code: string, verifyId: string, phoneNumber: string) => {
    return new Promise<any>((resolve, reject) => {
      firebaseAuth().currentUser!.getIdToken().then((tokenId) => {
        axios.post(`${config.settings.api}verify-phone`, {
          code,
          verifyId,
          phoneNumber
        }, {
            headers: { 'authorization': `Bearer ${tokenId}` }
          })
          .then(({ data }) => {
            this.loginByToken(data.token).then((user) => {
              resolve(user)
            })
          })
      })
        .catch((error: any) => reject(new SocialError(error.code, `authorizeSerive/confirmVerificationPhone  ${error.message}`)))
    })
  }

  /**
   * Confirm email code verfication
   */
  public confirmVerificationEmail = async (code: string, verifyId: string) => {
    try {
      const tokenId = await firebaseAuth().currentUser!.getIdToken()
      const result = await axios.post(`${config.settings.api}verify-email`, {
          code,
          verifyId
        }, {
            headers: { 'authorization': `Bearer ${tokenId}` }
          })

        const user = await this.loginByToken(result.data.token)
          return user!
    } catch (error) {
      throw new SocialError(error.code, `authorizeSerive/confirmVerificationEmail  ${error.message}`)
    }
  }

  /**
   * Confirm reset password code
   */
  public confirmResetPassword = (code: string, verifyId: string, email: string) => {
    return new Promise<any>((resolve, reject) => {
      axios.post(`${config.settings.api}verify-reset-password`, {
        code,
        verifyId,
        email
      })
        .then(({ data }) => {
          this.loginByToken(data.token).then((user) => {
            resolve(user)
          })
        })
        .catch((error: any) => reject(new SocialError(error.code, `authorizeSerive/confirmVerificationCode`)))
    })
  }

  /**
   * Store user information
   */
  private storeUserInformation = (userId: string, email: string, fullName: string, avatar: string, userName: string, password: string) => {
    return new Promise<RegisterUserResult>((resolve, reject) => {
      firebaseAuth().currentUser!.getIdToken().then((tokenId) => {
        axios.post(`${config.settings.api}register`, {
          userId,
          email,
          fullName,
          avatar,
          userName,
          password,
        }, { headers: { 'authorization': `Bearer ${tokenId}` } })
          .then(() => {
            resolve(new RegisterUserResult(userId))
          })
      })
        .catch((error: any) => reject(new SocialError(error.name, 'firestore/storeUserInformation : ' + error.message)))
    })
  }

  /**
   * Store user provider information
   */
  private storeUserProviderData = (
    userId: string,
    email: string,
    fullName: string,
    avatar: string,
    providerId: string,
    accessToken: string
  ) => {
    return new Promise<RegisterUserResult>((resolve, reject) => {
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
