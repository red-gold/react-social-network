// - Import react components
import { NotificationActionType } from 'constants/notificationActionType';
import { Map } from 'immutable';

import { INotificationAction } from './INotificationAction';
import { NotificationState } from './NotificationState';

// - Import domain
// - Import action types
/**
 * Notify actions
 * @param {object} state
 * @param {object} action
 */
export let notificationReducer = (state = Map(new NotificationState() as any), action: INotificationAction) => {
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
      return Map(new NotificationState() as any)

    default:
      return state

  }

}
