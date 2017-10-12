import { User } from 'domain/users'

import { Notification } from 'domain/notifications'

/**
 * Notification service interface
 *
 * @export
 * @interface INotificationService
 */
export interface INotificationService {
  addNotification: (notification: Notification) => Promise<void>
  getNotifications: (userId: string) => Promise<{[notifyId: string]: Notification}>
  deleteNotification: (notificationId: string, userId: string) => Promise<void>
  setSeenNotification: (notificationId: string, userId: string, notification: Notification) => Promise<void>
}
