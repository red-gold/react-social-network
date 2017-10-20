// - Import react components
import { firebaseRef, firebaseAuth } from 'app/firebase/'

import { SocialError } from 'domain/common'
import { Notification } from 'domain/notifications'
import { INotificationService } from 'services/notifications'

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

  public getNotifications: (userId: string)
  => Promise<{ [notifyId: string]: Notification }> = (userId) => {
    return new Promise<{ [notifyId: string]: Notification }>((resolve,reject) => {
      let notifiesRef: any = firebaseRef.child(`userNotifies/${userId}`)
      notifiesRef.on('value', (snapshot: any) => {
        let notifies: {[notifyId: string]: Notification} = snapshot.val() || {}
        resolve(notifies)
      })
    })
  }

  public deleteNotification: (notificationId: string, userId: string)
    => Promise <void> = (notificationId, userId) => {
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
