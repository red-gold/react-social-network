// - Import react components
import moment from 'moment/moment'
import _ from 'lodash'
import { Map } from 'immutable'

// - Import domain
import { Notification } from 'src/core/domain/notifications'

// - Import action types
import { NotificationActionType } from 'constants/notificationActionType'

import { NotificationState } from './NotificationState'
import { INotificationAction } from './INotificationAction'

/**
 * Notify actions
 * @param {object} state
 * @param {object} action
 */
export let notificationReducer = (state = Map(new NotificationState()), action: INotificationAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case NotificationActionType.ADD_NOTIFY:
      return state

    case NotificationActionType.ADD_NOTIFY_LIST:
    return state
    .set('userNotifies', payload)
    .set('loaded', true)

    case NotificationActionType.SEEN_NOTIFY:
    return state
    .setIn(['userNotifies', payload, 'isSeen'], true)
    .set('loaded', true)

    case NotificationActionType.DELETE_NOTIFY:
    return state
    .deleteIn(['userNotifies', payload])

    case NotificationActionType.CLEAR_ALL_DATA_NOTIFY:
      return Map(new NotificationState())

    default:
      return state

  }

}
