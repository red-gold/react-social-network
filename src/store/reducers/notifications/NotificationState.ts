import { Notification } from 'src/core/domain/notifications'

/**
 * Notification state
 * 
 * @export
 * @class NotificationState
 */
export class NotificationState  {

    /**
     * The list of users notification
     * 
     * @type {({[userId: string]: {[notificationId: string]: Notification}} | null)}
     * @memberof NotificationState
     */
    userNotifies: {[userId: string]: {[notificationId: string]: Notification}} = {}

    /**
     * If user notifications are loaded {true} or not {false}
     * 
     * @type {Boolean}
     * @memberof NotificationState
     */
    loaded: Boolean = false
  }