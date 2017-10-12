// - Import react components

// - Import domain
import { Profile } from 'domain/users'
import { SocialError } from 'domain/common'

// - Import action types
import { UserActionType } from 'constants/userActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'
import * as userActions from 'actions/userActions'

import { IServiceProvider, ServiceProvide } from 'factories'
import { IUserService } from 'services/users'

const serviceProvider: IServiceProvider = new ServiceProvide()
const userService: IUserService = serviceProvider.createUserService()

/* _____________ CRUD DB _____________ */

/**
 * Get user info from database
 */
export const dbGetUserInfo = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {

      return userService.getUserProfile(uid).then((userProfile: Profile) => {
        dispatch(addUserInfo(uid, {
          avatar: userProfile.avatar,
          email: userProfile.email,
          fullName: userProfile.fullName,
          banner: userProfile.banner,
          tagLine: userProfile.tagLine
        }))
      })
      .catch((error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))

    }
  }
}

/**
 *  Get user info from database
 * @param {string} uid
 * @param {string} callerKey
 */
export const dbGetUserInfoByUserId = (uid: string, callerKey: string) => {
  return (dispatch: any, getState: Function) => {
    if (uid) {

      return userService.getUserProfile(uid).then((userProfile: Profile) => {

        dispatch(addUserInfo(uid, {
          avatar: userProfile.avatar,
          email: userProfile.email,
          fullName: userProfile.fullName,
          banner: userProfile.banner,
          tagLine: userProfile.tagLine
        }))

        switch (callerKey) {
          case 'header':
            dispatch(globalActions.setHeaderTitle(userProfile.fullName))

            break

          default:
            break
        }
      })
      .catch((error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))

    }
  }
}

/**
 * Updata user information
 * @param {object} newInfo
 */
export const dbUpdateUserInfo = (newProfile: Profile) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid

    let profile: Profile = getState().user.info[uid]
    let updatedProfie: Profile = {
      avatar: newProfile.avatar || profile.avatar || '',
      banner: newProfile.banner || profile.banner || 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
      email: newProfile.email || profile.email || '',
      fullName: newProfile.fullName || profile.fullName || '',
      tagLine: newProfile.tagLine || profile.tagLine || ''
    }

    return userService.updateUserProfile(uid,updatedProfie).then(() => {

      dispatch(updateUserInfo(uid, updatedProfie))
      dispatch(closeEditProfile())
    })
    .catch((error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))

  }

}

// - Get people info from database
export const dbGetPeopleInfo = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      return userService.getUsersProfile(uid)
      .then((usersProfile: {[userId: string]: Profile}) => {
        dispatch(addPeopleInfo(usersProfile))
      })
      .catch((error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))

    }
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add user information
 * @param {string} uid is the user identifier
 * @param {Profile} info is the information about user
 */
export const addUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.ADD_USER_INFO,
    payload: { uid, info }
  }
}

/**
 * Add people information
 * @param {[userId: string]: Profile} infoList is the lst of information about users
 */
export const addPeopleInfo = (infoList: {[userId: string]: Profile}) => {
  return {
    type: UserActionType.ADD_PEOPLE_INFO,
    payload: infoList
  }
}

/**
 * Update user information
 * @param {string} uid is the user identifier
 * @param {Profile} info is the information about user
 */
export const updateUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.UPDATE_USER_INFO,
    payload: { uid, info }
  }
}

/**
 *  User info
 * @param {Profile} info
 */
export const userInfo = (info: Profile) => {
  return {
    type: UserActionType.USER_INFO,
    info
  }
}

export const clearAllData = () => {
  return {
    type: UserActionType.CLEAR_ALL_DATA_USER
  }
}

/**
 * Open edit profile
 */
export const openEditProfile = () => {
  return {
    type: UserActionType.OPEN_EDIT_PROFILE
  }

}

/**
 * Close edit profile
 */
export const closeEditProfile = () => {
  return {
    type: UserActionType.CLOSE_EDIT_PROFILE
  }

}