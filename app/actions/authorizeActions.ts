// - Import react components
import moment from 'moment'
import { push } from 'react-router-redux'

// -Import domain
import { User } from 'domain/users'
import { SocialError } from 'domain/common'

// - Import action types
import { AuthorizeActionType } from 'constants/authorizeActionType'

// - Import services
import { IAuthorizeService } from 'services/authorize'
import { IServiceProvider, ServiceProvide } from 'factories'

const serviceProvider: IServiceProvider = new ServiceProvide()
const authorizeService: IAuthorizeService = serviceProvider.createAuthorizeService()

// - Import actions
import * as globalActions from 'actions/globalActions'

  /* _____________ CRUD DB _____________ */

  /**
   * Log in user in server
   * @param {string} email
   * @param {string} password
   */
export const dbLogin = (email: string, password: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())
    return authorizeService.login(email, password).then((result) => {
      dispatch(globalActions.showNotificationSuccess())
      dispatch(login(result.uid))
      dispatch(push('/'))
    }, (error: SocialError) => dispatch(globalActions.showErrorMessage(error.code)))
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

    }, (error: SocialError) => dispatch(globalActions.showErrorMessage(error.code)))
  }

}

  /**
   *
   * @param user for registering
   */
export const dbSignup = (user: User) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())
    return authorizeService.registerUser(user).then((result) => {
      dispatch(signup({
        userId: result.uid,
        ...user
      }))
      dispatch(push('/'))
    })
      .catch((error: SocialError) => dispatch(globalActions.showErrorMessage(error.code)))
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
                dispatch(globalActions.showErrorMessage(error.code))
                dispatch(dbLogout())
                break
              default:

            }
          })
  }
}

  /* _____________ CRUD State _____________ */

  /**
   * Loing user
   * @param {string} uids
   */
export const login = (uid: string) => {
  return {
    type: AuthorizeActionType.LOGIN,
    payload: { authed: true, uid }
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
export const signup = (user: User) => {
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
