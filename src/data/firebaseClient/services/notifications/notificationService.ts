// - Import react components
import { firebaseRef, firebaseAuth } from 'data/firebaseClient'

import { SocialError } from 'core/domain/common'
import { Notification } from 'core/domain/notifications'
import { INotificationService } from 'core/services/notifications'

/**
 * Firbase notification service
 *
 * @export
 * @class NotificationService
 * @implements {INotificationService}
 */
export class NotificationService implements INotificationService {
  public addNotification: (notification: Notification)
  => Promise<void> = (notification: Notification) => {
    return new Promise<void>((resolve,reject) => {
      firebaseRef.child(`userNotifies/${notification.notifyRecieverUserId}`)
      .push(notification)
      .then(() => {
        resolve()
      })
      .catch((error: any) => {
        reject(new SocialError(error.code, error.message))
      })
    })
  }

  public getNotifications: (userId: string, callback: (resultNotifications: {[notifyId: string]: Notification}) => void)
    => void = (userId,callback) => {
      let notificationsRef = firebaseRef.child(`userNotifies/${userId}`)
      notificationsRef.on('value', (snapshot: any) => {
        let notifications: {[notifyId: string]: Notification} = snapshot.val() || {}
        callback(notifications)
      })
    }

  public deleteNotification: (notificationId: string, userId: string)
    => Promise < void > = (notificationId, userId) => {
      return new Promise<void>((resolve, reject) => {
        let updates: any = {}
        updates[`userNotifies/${userId}/${notificationId}`] = null
        firebaseRef.update(updates)
    .then(() => {
      resolve()
    })
    .catch((error: any) => {
      reject(new SocialError(error.code, error.message))
    })
      })
    }

  public setSeenNotification: (notificationId: string, userId: string, notification: Notification)
    => Promise <void> = (notificationId, userId, notification) => {
      return new Promise<void>((resolve, reject) => {
        let updates: any = {}
        updates[`userNotifies/${userId}/${notificationId}`] = notification
        firebaseRef.update(updates)
        .then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })
      })
    }

}
