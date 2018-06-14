import { Notification } from 'src/core/domain/notifications'
import {Map} from 'immutable'

/**
 * Notification state
 * 
 * @export
 * @class NotificationState
 */
export class NotificationState  {

    /**
     * The list of users notification
     */
    userNotifies: Map<string, Map<string, any>> = Map({})

    /**
     * If user notifications are loaded {true} or not {false}
     */
    loaded: Boolean = false
  }