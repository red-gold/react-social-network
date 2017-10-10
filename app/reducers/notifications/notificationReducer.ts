// - Import react components
import moment from 'moment'
import _ from 'lodash'

// - Import domain
import { Notification } from 'domain/notifications'

// - Import action types
import {NotificationActionType} from 'constants/notificationActionType'

import { NotificationState } from './NotificationState'
import { INotificationAction } from './INotificationAction'


/**
 * Notify actions
 * @param {object} state 
 * @param {object} action 
 */
export let notificationReducer = (state: NotificationState = new NotificationState(), action: INotificationAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case NotificationActionType.ADD_NOTIFY:
      return state
      
    case NotificationActionType.ADD_NOTIFY_LIST:
      return {
        ...state,
        userNotifies: {
          ...payload
        },
        loaded:true
      }

      case NotificationActionType.SEEN_NOTIFY:
      return {
        ...state,
        userNotifies: {
          ...state.userNotifies,
          [payload]:{
            ...state.userNotifies![payload],
            isSeen:true
          }
        },
        loaded:true
      }
 
    case NotificationActionType.DELETE_NOTIFY:
      let parsedNotifies = {}
      Object.keys(state.userNotifies!).map((id) => {
        if (id !== payload) {
          _.merge(parsedNotifies, { [id]: { ...state.userNotifies![id] } })
        }

      })
      return {
        ...state,
        userNotifies: {
            ...parsedNotifies
        }
      }
  

    case NotificationActionType.CLEAR_ALL_DATA_NOTIFY:
      return new NotificationState()


    default:
      return state

  }


}
