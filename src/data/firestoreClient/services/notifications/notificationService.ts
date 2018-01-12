// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'

import { SocialError } from 'core/domain/common'
import { Notification } from 'core/domain/notifications'
import { INotificationService } from 'core/services/notifications'
import { injectable } from 'inversify'

/**
 * Firbase notification service
 *
 * @export
 * @class NotificationService
 * @implements {INotificationService}
 */
@injectable()
export class NotificationService implements INotificationService {
  public addNotification: (notification: Notification)
  => Promise<void> = (notification: Notification) => {
    return new Promise<void>((resolve,reject) => {
      db.doc(`users/${notification.notifyRecieverUserId}`).collection(`notifications`)
      .add({...notification})
      .then(() => {
        resolve()
      })
    })
  }

  public getNotifications: (userId: string, callback: (resultNotifications: {[notifyId: string]: Notification}) => void)
    => void = (userId,callback) => {
      let notificationsRef = db.doc(`users/${userId}`).collection('notifications')
      notificationsRef.onSnapshot((snapshot) => {
        let parsedData: { [notifyId: string]: Notification } = {}
        snapshot.forEach((result) => {
          parsedData[result.id] = {
            id: result.id,
            ...result.data() as Notification
          }
        })
        callback(parsedData)
      })
    }

  public deleteNotification: (notificationId: string, userId: string)
    => Promise < void > = (notificationId, userId) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const notificationRef = db.doc(`users/${userId}/notifications/${notificationId}`)

        batch.delete(notificationRef)
        batch.commit().then(() => {
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
        const batch = db.batch()
        const notificationRef = db.doc(`users/${userId}/notifications/${notificationId}`)

        batch.update(notificationRef,{...notification})
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })
      })
    }

}
