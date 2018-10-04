// - Import react components
import firebase, { firebaseAuth, db } from 'data/firestoreClient'
import moment from 'moment/moment'

import { SocialError } from 'core/domain/common'
import { IUserSettingService } from 'core/services/users'
import { injectable } from 'inversify'

/**
 * Firbase userSetting service
 */
@injectable()
export class UserSettingService implements IUserSettingService {

  /**
   * Get user setting
   */
  public getUserSetting: (userId: string)
    => Promise<object> = (userId) => {

      return new Promise<object>((resolve, reject) => {
        let userSettingRef = db.doc(`userSetting/${userId}`)
        userSettingRef.get().then((result) => {
            resolve(result.data())
        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/getUserSetting :' + error.message)))
      })
    }

  /**
   * Update user setting 
   */
  public updateUserSetting: (userId: string, setting: object)
    => Promise<void> = (userId, setting) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const userSettingRef = db.doc(`userSetting/${userId}`)

        batch.set(userSettingRef, { ...setting, id: userId})
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/updateUserSetting' + error.message)))
      })
    }

}
