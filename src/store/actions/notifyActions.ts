
// - Import domain
import { Notification } from 'src/core/domain/notifications'
import { SocialError } from 'src/core/domain/common'
import { Map, fromJS } from 'immutable'

// - Import action types
import { NotificationActionType } from 'constants/notificationActionType'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as userActions from 'store/actions/userActions'

import { INotificationService } from 'src/core/services/notifications'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/socialEngine'

/**
 * Get service providers
 */
const notificationService: INotificationService = provider.get<INotificationService>(SocialProviderTypes.NotificationService)

/* _____________ CRUD DB _____________ */

/**
 *  Add notificaition to database
 */
export const dbAddNotification = (newNotify: Notification) => {
  return (dispatch: any, getState: Function) => {

    let notify: Notification = {
      isSeen: false,
      description: newNotify.description,
      url: newNotify.url,
      notifierUserId: newNotify.notifierUserId,
      notifyRecieverUserId: newNotify.notifyRecieverUserId
    }

    return notificationService.addNotification(notify)
      .then(() => {
        dispatch(addNotify())
      })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))

  }
}

/**
 * Get all notificaitions from database
 */
export const dbGetNotifications = () => {
  return (dispatch: Function , getState: Function) => {
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    if (uid) {
      return notificationService.getNotifications(uid,
        (notifications: { [notifyId: string]: Notification} ) => {
          Object.keys(notifications).forEach((key => {
            if (!state.getIn(['user', 'info', 'notifications', 'key','notifierUserId'])) {
              dispatch(userActions.dbGetUserInfoByUserId(notifications[key].notifierUserId,''))
            }
          }))
          dispatch(addNotifyList(fromJS(notifications)))
        })
    }
  }
}

/**
 * Delete a notificaition from database
 * @param  {string} id of notificaition
 */
export const dbDeleteNotification = (id: string) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    return notificationService.deleteNotification(id,uid).then(() => {
      dispatch(deleteNotify(id))
    })
    .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))
  }

}

/**
 * Make seen a notificaition from database
 * @param  {string} id of notificaition
 */
export const dbSeenNotification = (id: string) => {
  return (dispatch: any, getState: Function) => {

    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    let notify: Map<string, any> = state.getIn(['notify', 'userNotifies', id])

    let updatedNotification: Notification = {
      description: notify.get('description'),
      url: notify.get('url'),
      notifierUserId: notify.get('notifierUserId'),
      notifyRecieverUserId: uid,
      isSeen: true
    }

    return notificationService.setSeenNotification(id,uid,updatedNotification)
    .then(() => {
      dispatch(seenNotify(id))
    })
    .catch((error) => dispatch(globalActions.showMessage(error.message)))
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
export const addNotifyList = (userNotifies: Map<string, any>) => {

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
