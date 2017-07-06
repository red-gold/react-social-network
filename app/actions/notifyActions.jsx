// - Import react components
import moment from 'moment'
import { firebaseRef } from 'app/firebase/'

// - Import action types
import * as types from 'actionTypes'

// - Import actions
import * as globalActions from 'globalActions'
import * as userActions from 'userActions'


/* _____________ CRUD DB _____________ */

/**
 *  Add notificaition to database
 * @param  {object} newNotify user notificaition
 */
export const dbAddNotify = (newNotify) => {
  return (dispatch, getState) => {

    var uid = getState().authorize.uid
    var notify = {
      description: newNotify.description,
      url: newNotify.url,
      notifierUserId: newNotify.notifierUserId,
      isSeen: false
    }

    var notifyRef = firebaseRef.child(`userNotifies/${newNotify.notifyRecieverUserId}`).push(notify)
    return notifyRef.then(() => {
      dispatch(addNotify())
    }, (error) => dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Get all notificaitions from database
 */
export const dbGetNotifies = () => {
  return (dispatch, getState) => {
    var uid = getState().authorize.uid
    if (uid) {
      var notifiesRef = firebaseRef.child(`userNotifies/${uid}`);

      return notifiesRef.on('value', (snapshot) => {
        var notifies = snapshot.val() || {};

        Object.keys(notifies).forEach((key => {
          if (!getState().user.info[notifies[key].notifierUserId]) {
            dispatch(userActions.dbGetUserInfoByUserId(notifies[key].notifierUserId))

          }
        }))
        dispatch(addNotifyList(notifies))
      })

    }
  }
}


/**
 * Delete a notificaition from database
 * @param  {string} id of notificaition
 */
export const dbDeleteNotify = (id) => {
  return (dispatch, getState) => {

    // Get current user id
    var uid = getState().authorize.uid

    // Write the new data simultaneously in the list
    var updates = {};
    updates[`userNotifies/${uid}/${id}`] = null;

    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteNotify(id))
    }, (error) => dispatch(globalActions.showErrorMessage(error.message)))
  }

}



/**
 * Make seen a notificaition from database
 * @param  {string} id of notificaition
 */
export const dbSeenNotify = (id) => {
  return (dispatch, getState) => {

    // Get current user id
    var uid = getState().authorize.uid
    let notify = getState().notify.userNotifies[id]
    let updatedNotify = {
      description: notify.description,
      url: notify.url,
      notifierUserId: notify.notifierUserId,
      isSeen: true
    }
    // Write the new data simultaneously in the list
    var updates = {};
    updates[`userNotifies/${uid}/${id}`] = updatedNotify;

    return firebaseRef.update(updates).then((result) => {
      dispatch(seenNotify(id))
    }, (error) => dispatch(globalActions.showErrorMessage(error.message)))
  }

}

/* _____________ CRUD State _____________ */


/**
 * Add notificaition 
 * @param {object} data  
 */
export const addNotify = () => {

  return {
    type: types.ADD_NOTIFY
  }
}

/**
 * Add notificaition list
 * @param {[object]} userNotifies an array of notificaitions
 */
export const addNotifyList = (userNotifies) => {

  return {
    type: types.ADD_NOTIFY_LIST,
    payload: userNotifies
  }
}


/**
 * Delete a notificaition
 * @param  {string} id of notificaition
 */
export const deleteNotify = (id) => {
  return { type: types.DELETE_NOTIFY, payload: id }

}

/**
 * Change notificaition to has seen status
 * @param  {string} id of notificaition
 */
export const seenNotify = (id) => {
  return { type: types.SEEN_NOTIFY, payload: id }

}

/**
 * Clear all data
 */
export const clearAllNotifications = () => {
  return {
    type: types.CLEAR_ALL_DATA_NOTIFY
  }
}


