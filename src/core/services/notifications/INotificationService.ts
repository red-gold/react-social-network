import { User } from 'core/domain/users'

import { Notification } from 'core/domain/notifications'

/**
 * Notification service interface
 *
 * @export
 * @interface INotificationService
 */
export interface INotificationService {
  addNotification: (notification: Notification) => Promise<void>
  getNotifications: (userId: string, callback: (resultNotifications: {[notifyId: string]: Notification}) => void) => void
  deleteNotification: (notificationId: string, userId: string) => Promise<void>
  setSeenNotification: (notificationId: string, userId: string, notification: Notification) => Promise<void>
}
