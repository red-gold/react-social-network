
// - Import react components
import { push } from 'react-router-redux'

// -Import domain
import { User } from 'src/core/domain/users'
import { SocialError } from 'src/core/domain/common'
import { OAuthType, LoginUser } from 'src/core/domain/authorize'

import { UserRegisterModel } from 'src/models/users/userRegisterModel'

// - Import action types
import { AuthorizeActionType } from 'constants/authorizeActionType'

// - Import services
import { IAuthorizeService } from 'src/core/services/authorize'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import { provider } from 'src/socialEngine'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'

/* _____________ CRUD State _____________ */

/**
 * Loing user
 * @param {string} uids
 */
export const login = (uid: string, isVerifide: boolean) => {
  return {
    type: AuthorizeActionType.LOGIN,
    payload: { authed: true, isVerifide, uid }
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
  return { type: AuthorizeActionType.UPDATE_PASSWORD }
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
    dispatch(globalActions.showNotificationRequest())
    return authorizeService.login(email, password).then((result) => {
      dispatch(globalActions.showNotificationSuccess())
      dispatch(login(result.uid, result.emailVerified))
      dispatch(push('/'))
    }, (error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }
}

/**
 * Log out user in server
 */
export const dbLogout = () => {
  return (dispatch: any, getState: any) => {
    return authorizeService.logout().then((result) => {
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
    let newUser = new User()
    newUser.email = user.email
    newUser.password = user.password
    newUser.fullName = user.fullName

    return authorizeService.registerUser(newUser).then((result) => {
      dispatch(signup({
        userId: result.uid,
        ...user
      }))
      dispatch(dbSendEmailVerfication())
      dispatch(push('/emailVerification'))
    })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}

/**
 * Change user's password
 * @param {string} newPassword
 */
export const dbUpdatePassword = (newPassword: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.updatePassword(newPassword).then(() => {

      // Update successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(updatePassword())
      dispatch(push('/'))
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
      dispatch(login(result.uid, true))
      dispatch(push('/'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        dispatch(globalActions.showMessage(error.code))

      })
  }
}
