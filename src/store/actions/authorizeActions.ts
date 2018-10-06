
// - Import react components
import { push } from 'react-router-redux'
import {Map} from 'immutable'

// -Import domain
import { User } from 'core/domain/users'
import { SocialError } from 'core/domain/common'
import { OAuthType, LoginUser } from 'core/domain/authorize'

import { UserRegisterModel } from 'models/users/userRegisterModel'

// - Import action types
import { AuthorizeActionType } from 'constants/authorizeActionType'

// - Import services
import { IAuthorizeService } from 'core/services/authorize'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as serverActions from 'store/actions/serverActions'

import { provider } from 'src/socialEngine'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import config from 'src/config'
import { VerificationType } from 'core/domain/authorize/verificationType'
import { AuthAPI } from 'api/AuthAPI'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

/* _____________ CRUD State _____________ */

/**
 * Loing user
 */
export const login = (user: LoginUser) => {
  return {
    type: AuthorizeActionType.LOGIN,
    payload: Map(user)
  }
}

/**
 * Logout user
 */
export const logout = () => {
  return { type: AuthorizeActionType.LOGOUT }
}

/**
 * User registeration call
 * @param user  for registering
 */
export const signup = (user: UserRegisterModel) => {
  return {
    type: AuthorizeActionType.SIGNUP,
    payload: { ...user }
  }

}

/**
 * Update user's password
 */
export const updatePassword = () => {
  return { type: AuthorizeActionType.UPDATE_PASSWORD}
}

/**
 * Subscribe authorize state change
 */
export const subcribeAuthorizeStateChange = () => {
  return { type: AuthorizeActionType.SUBSCRIBE_AUTH_STATE_CHANGE}
}

/**
 * Get service providers
 */
const authorizeService: IAuthorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService)

/* _____________ CRUD DB _____________ */

/**
 * Log in user in server
 */
export const dbLogin = (email: string, password: string) => {
  return (dispatch: any, getState: any) => {

    let loginRequest =  AuthAPI.createLoginRequest(email)
    dispatch(serverActions.sendRequest(loginRequest))

    dispatch(globalActions.showNotificationRequest())

    return authorizeService.login(email, password).then((result) => {

      loginRequest.status = ServerRequestStatusType.OK
      dispatch(serverActions.sendRequest(loginRequest))

      dispatch(globalActions.showNotificationSuccess())
      dispatch(login(result))
      dispatch(push('/'))
    }, (error: SocialError) => {
      loginRequest.status = ServerRequestStatusType.Error
      dispatch(serverActions.sendRequest(loginRequest))
      dispatch(globalActions.showMessage(error.message))
    })
  }
}

/**
 * Log out user in server
 */
export const dbLogout = () => {
  return (dispatch: any, getState: any) => {
    return authorizeService.logout().then((result) => {
      localStorage.removeItem('firebase.token')
      dispatch(logout())
      dispatch(push('/login'))

    }, (error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}

/**
 * Send email verification
 */
export const dbSendEmailVerfication = () => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.sendEmailVerification().then(() => {
      // Send email verification successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(push('/'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        dispatch(globalActions.showMessage(error.code))

      })
  }
}

/**
 *
 * @param user for registering
 */
export const dbSignup = (user: UserRegisterModel) => {
  return (dispatch: Function, getState: Function) => {
    dispatch(globalActions.showNotificationRequest())
    let newUser = new UserRegisterModel()
    newUser.email = user.email
    newUser.password = user.password
    newUser.fullName = user.fullName

    return authorizeService.registerUser(newUser).then((result) => {
      dispatch(signup({
        userId: result.uid,
        ...user
      }))
      if (config.settings.verificationType === VerificationType.email) {
        dispatch(dbSendEmailVerfication())
      }
      dispatch(push('/'))
    })
      .catch((error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
      })
  }

}

/**
 * Change user's password
 * @param {string} newPassword
 */
export const dbUpdatePassword = (newPassword: string, confirmPassword: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())
    
    return authorizeService.updatePassword(newPassword, confirmPassword).then(() => {

      // Update successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(updatePassword())
      dispatch(dbLogout())
    })
      .catch((error: SocialError) => {
        // An error happened.
        switch (error.code) {
          case 'auth/requires-recent-login':
            dispatch(globalActions.showMessage(error.code))
            dispatch(dbLogout())
            break
          default:

        }
      })
  }
}

/**
 * Reset user's password
 * @param {string} newPassword
 */
export const dbResetPassword = (email: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.resetPassword(email).then(() => {

      // Reset password successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(push('/login'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        dispatch(globalActions.showMessage(error.code))

      })
  }
}

/**
 * Login user with OAuth
 */
export const dbLoginWithOAuth = (type: OAuthType) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.loginWithOAuth(type).then((result: LoginUser) => {
      // Send email verification successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(login(result))
      dispatch(push('/'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        dispatch(globalActions.showMessage(error.code))

      })
  }
}
