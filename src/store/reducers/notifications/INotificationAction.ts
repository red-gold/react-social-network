import {NotificationActionType} from 'constants/notificationActionType'

/**
 *  Notification action interface
 * 
 * @export
 * @interface INotificationAction
 */
export interface INotificationAction  {
    payload: any,
    type: NotificationActionType
  
  }
  