
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import config from 'src/config'

// - Import react components
import { firebaseAuth, db } from 'data/firestoreClient'

import { IAuthorizeService } from 'core/services/authorize'
import { User, UserProvider } from 'core/domain/users'
import { LoginUser, RegisterUserResult } from 'core/domain/authorize'
import { SocialError } from 'core/domain/common'

import { OAuthType } from 'core/domain/authorize/oauthType'
import moment from 'moment/moment'
import { injectable } from 'inversify'
import { UserClaim } from 'core/domain/authorize/userClaim'
import { UserRegisterModel } from 'models/users/userRegisterModel'
/**
 * Firbase authorize service
 */
@injectable()
export class AuthorizeService implements IAuthorizeService {
  constructor() {
    this.getIdToken = this.getIdToken.bind(this)
  }
  /**
   * Login the user
   */
  public login: (email: string, password: string) => Promise<LoginUser> = (email, password) => {

    return new Promise<LoginUser>((resolve, reject) => {
      axios.post(`${config.settings.api}login`, {
        userName: email,
        password: password
      })
        .then(({data}) => {
          this.loginByToken(data.token).then((user) => {
            resolve(user)
          })
        })
      .catch((error: any) => {
        const responseError = error.response.data
        reject(new SocialError(responseError._code || responseError.code, responseError._message ||  responseError.message))
      })
    })
  }

  /**
   * Login user by token
   */
  public async loginByToken(token: any) {

    try {
      const authedUser = await firebaseAuth().signInWithCustomToken(token)
      if (authedUser) {
        const user = authedUser.user!
        const idToken = await user.getIdToken()
        localStorage.setItem('firebase.token', idToken)
        if (authedUser) {
          const loginUser  = new LoginUser(
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
        localStorage.removeItem('firebase.token')
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
  public registerUser: (user: UserRegisterModel) => Promise<RegisterUserResult> = (user) => {
    return new Promise<RegisterUserResult>((resolve, reject) => {
      firebaseAuth()
        .createUserWithEmailAndPassword(user.email as string, user.password as string)
        .then((signupResult) => {
          const { uid, email } = signupResult.user!
          this.storeUserInformation(uid, email!, user.fullName, '', user.email!, user.password!).then(resolve)
        })
        .catch((error: any) => { 
          
          reject(new SocialError(error.code, error.message))
        })
    })
  }

  /**
   * Whether user is login or not
   */
  public isUserUserVerified() {
    let phoneVerified = false
    const token = localStorage.getItem('firebase.token')
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
          .then(({data}) => {
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
    const scop = this
    return new Promise<UserClaim>((resolve, reject) => {
      currentUser.getIdTokenResult().then((result: any) => {
        const {claims} = result
        
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
          localStorage.setItem('firebase.token', idToken)
        })
        
      }
        callBack(user as any)
    })
  }

  /**
   * Reset user password
   *
   * @memberof AuthorizeService
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
   *
   * @memberof AuthorizeService
   */
  public sendEmailVerification: () => Promise<void> = () => {
    return new Promise<void>((resolve, reject) => {
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
        const {providerId } = credential!
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

      })

    })
  }

  /**
   * Get current user id token
   */
  public getIdToken: () => Promise<string> = async () => {
    const currentUser = firebaseAuth().currentUser
    if (currentUser) {
     const token = await currentUser.getIdToken()
     return token
    }
   return localStorage.getItem('firebase.token') as string
  }

  /**
   * Send sms verfication
   */
  public sendSmsVerification = (phoneNumber: string, value: any) => {
    const scop = this
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
         .then(({data}) => {
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
    const scop = this
    return new Promise<string>((resolve, reject) => {
        axios.post(`${config.settings.api}email-verification-code`, {
        email,
        'g-recaptcha-response': value
      })
        .then(({data}) => {
          resolve(data.verifyId)
        })
      .catch((error) => {
        const responseError = error.response.data
        reject(new SocialError(responseError._code || responseError.code, responseError._message ||  responseError.message))

    })

    })

  }

  /**
   * Confirm verfication code
   */
  public confirmVerificationCode = (code: string, verifyId: string, phoneNumber: string) => {
    return new Promise<any>((resolve, reject) => {
      firebaseAuth().currentUser!.getIdToken().then((tokenId) => {
      axios.post(`${config.settings.api}verify-phone`, {
        code,
        verifyId,
        phoneNumber
      }, {
          headers: { 'authorization': `Bearer ${tokenId}` }
        })
        .then(({data}) => {
          this.loginByToken(data.token).then((user) => {
            resolve(user)
          })
        })
      })
        .catch((error: any) => reject(new SocialError(error.code, `authorizeSerive/confirmVerificationCode  ${error.message}`)))
    })
  }

  /**
   * Confirm reset password code
   */
  public confirmResetPassword = (code: string, verifyId: string, email: string) => {
    return new Promise<any>((resolve, reject) => {
      axios.post(`${config.settings.api}verify-email`, {
        code,
        verifyId,
        email
      })
        .then(({data}) => {
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
      },{headers: { 'authorization': `Bearer ${tokenId}` }})
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
