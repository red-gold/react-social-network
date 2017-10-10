// - Import react components
import moment from 'moment'
import { firebaseRef } from 'app/firebase/'

// - Import domain
import { Notification } from 'domain/notifications'

// - Import action types
import {NotificationActionType} from 'constants/notificationActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'
import * as userActions from 'actions/userActions'


/* _____________ CRUD DB _____________ */

/**
 *  Add notificaition to database
 * @param  {object} newNotify user notificaition
 */
export const dbAddNotify = (newNotify: Notification) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid

    let notify: Notification = {
      isSeen: false,
      description: newNotify.description,
      url: newNotify.url,
      notifierUserId: newNotify.notifierUserId,
      notifyRecieverUserId: newNotify.notifyRecieverUserId
    }

    let notifyRef: any = firebaseRef.child(`userNotifies/${newNotify.notifyRecieverUserId}`).push(notify)
    return notifyRef.then(() => {
      dispatch(addNotify())
    }, (error: any) => dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Get all notificaitions from database
 */
export const dbGetNotifies = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      let notifiesRef: any = firebaseRef.child(`userNotifies/${uid}`)

      return notifiesRef.on('value', (snapshot: any) => {
        let notifies: {[notifyId: string]: Notification} = snapshot.val() || {}

        Object.keys(notifies).forEach((key => {
          if (!getState().user.info[notifies[key].notifierUserId]) {
            dispatch(userActions.dbGetUserInfoByUserId(notifies[key].notifierUserId,''))

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
export const dbDeleteNotify = (id: string) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates: any = {}
    updates[`userNotifies/${uid}/${id}`] = null

    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteNotify(id))
    }, (error) => dispatch(globalActions.showErrorMessage(error.message)))
  }

}



/**
 * Make seen a notificaition from database
 * @param  {string} id of notificaition
 */
export const dbSeenNotify = (id: string) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid
    let notify: Notification = getState().notify.userNotifies[id]
    
    
    let updates: any = {}
    updates[`userNotifies/${uid}/${id}`] = {
      description: notify.description,
      url: notify.url,
      notifierUserId: notify.notifierUserId,
      isSeen: true
    }

    return firebaseRef.update(updates).then((result) => {
      dispatch(seenNotify(id))
    }, (error) => dispatch(globalActions.showErrorMessage(error.message)))
  }

}

/* _____________ CRUD State _____________ */


/**
 * Add notificaition 
 */
export const addNotify = () => {

  return {
    type: NotificationActionType.ADD_NOTIFY
  }
}

/**
 * Add notificaition list
 * @param {[notifyId: string]: Notification} userNotifies an array of notificaitions
 */
export const addNotifyList = (userNotifies: {[notifyId: string]: Notification}) => {

  return {
    type: NotificationActionType.ADD_NOTIFY_LIST,
    payload: userNotifies
  }
}


/**
 * Delete a notificaition
 * @param  {string} id of notificaition
 */
export const deleteNotify = (id: string) => {
  return { type: NotificationActionType.DELETE_NOTIFY, payload: id }

}

/**
 * Change notificaition to has seen status
 * @param  {string} id of notificaition
 */
export const seenNotify = (id: string) => {
  return { type: NotificationActionType.SEEN_NOTIFY, payload: id }

}

/**
 * Clear all data
 */
export const clearAllNotifications = () => {
  return {
    type: NotificationActionType.CLEAR_ALL_DATA_NOTIFY
  }
}


