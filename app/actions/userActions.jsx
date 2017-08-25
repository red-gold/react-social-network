// - Import react components
import { firebaseRef } from 'app/firebase/'

// - Import action types
import * as types from 'actionTypes'

// - Import actions 
import *  as globalActions from 'globalActions'
import * as userActions from 'userActions'



/* _____________ CRUD DB _____________ */


/**
 * Get user info from database
 */
export const dbGetUserInfo = () => {
  return (dispatch, getState) => {
    var uid = getState().authorize.uid
    if (uid) {
      var userInfoRef = firebaseRef.child(`users/${uid}/info`);

      return userInfoRef.once('value').then((snapshot) => {
        var userInfo = snapshot.val() || {};
        dispatch(addUserInfo(uid, {
          avatar: userInfo.avatar,
          email: userInfo.email,
          fullName: userInfo.fullName,
          banner: userInfo.banner,
          tagLine: userInfo.tagLine
        }))
      }, error => console.log(error));

    }
  }
}

/**
 *  Get user info from database
 * @param {string} uid 
 */
export const dbGetUserInfoByUserId = (uid, sw) => {
  return (dispatch, getState) => {
    if (uid) {
      var userInfoRef = firebaseRef.child(`users/${uid}/info`);

      return userInfoRef.once('value').then((snapshot) => {
        var userInfo = snapshot.val() || {};
        dispatch(addUserInfo(uid, {
          avatar: userInfo.avatar,
          email: userInfo.email,
          fullName: userInfo.fullName,
          banner: userInfo.banner,
          tagLine: userInfo.tagLine
        }))
        switch (sw) {
          case 'header':
            dispatch(globalActions.setHeaderTitle(userInfo.fullName))

            break;

          default:
            break;
        }
      }, error => console.log(error));

    }
  }
}

/**
 * Updata user information
 * @param {object} newInfo 
 */
export const dbUpdateUserInfo = (newInfo) => {
  return (dispatch, getState) => {

    // Get current user id
    var uid = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates = {};
    let info = getState().user.info[uid]
    let updatedInfo = {
      avatar: newInfo.avatar || info.avatar || '',
      banner: newInfo.banner || info.banner || 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
      email: newInfo.email || info.email || '',
      fullName: newInfo.fullName || info.fullName || '',
      tagLine: newInfo.tagLine || info.tagLine || ''
    }
    updates[`users/${uid}/info`] = updatedInfo
    return firebaseRef.update(updates).then((result) => {

      dispatch(updateUserInfo(uid, updatedInfo))
      dispatch(closeEditProfile())
    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
    })
  }

}

// - Get people info from database
export const dbGetPeopleInfo = () => {
  return (dispatch, getState) => {
    var uid = getState().authorize.uid
    if (uid) {
      var peopleRef = firebaseRef.child(`users`);

      return peopleRef.once('value').then((snapshot) => {
        let people = snapshot.val() || {};

        let parsedPeople = {};
        Object.keys(people).forEach((userId) => {
          if (userId !== uid) {
            let userInfo = people[userId].info
            parsedPeople[userId] = {
              avatar: userInfo.avatar,
              email: userInfo.email,
              fullName: userInfo.fullName,
              banner: userInfo.banner,
              tagLine: userInfo.tagLine
            }
          }

        })
        dispatch(addPeopleInfo(parsedPeople))
      }, error => console.log(error));

    }
  }
}

/* _____________ CRUD State _____________ */


/**
 * Add user information
 * @param {string} uid is the user identifier
 * @param {object} info is the information about user
 */
export const addUserInfo = (uid, info) => {
  return {
    type: types.ADD_USER_INFO,
    payload: { uid, info }
  }
}

/**
 * Add people information
 * @param {[object]} infoList is the lst of information about users
 */
export const addPeopleInfo = (infoList) => {
  return {
    type: types.ADD_PEOPLE_INFO,
    payload: infoList
  }
}

/**
 * Update user information
 * @param {string} uid is the user identifier
 * @param {object} info is the information about user
 */
export const updateUserInfo = (uid, info) => {
  return {
    type: types.UPDATE_USER_INFO,
    payload: { uid, info }
  }
}

/**
 *  User info
 * @param {object} info 
 */
export const userInfo = (info) => {
  return {
    type: types.USER_INFO,
    info
  }
}

export const clearAllData = () => {
  return {
    type: types.CLEAR_ALL_DATA_USER
  }
}


/**
 * Open edit profile
 */
export const openEditProfile = () => {
  return {
    type: types.OPEN_EDIT_PROFILE
  }

}

/**
 * Close edit profile
 */
export const closeEditProfile = () => {
  return {
    type: types.CLOSE_EDIT_PROFILE
  }

}