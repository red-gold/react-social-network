// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'
import firebase from 'firebase'
import moment from 'moment'

import { SocialError } from 'core/domain/common'
import { Profile, UserProvider } from 'core/domain/users'
import { IUserService } from 'core/services/users'

/**
 * Firbase user service
 *
 * @export
 * @class UserService
 * @implements {IUserService}
 */
export class UserService implements IUserService {

  public getUserProfile: (userId: string)
    => Promise<Profile> = (userId) => {
      return new Promise<Profile>((resolve, reject) => {
        let userProfileRef = db.doc(`userInfo/${userId}`)
        userProfileRef.get().then((snapshot) => {
          if (!snapshot.exists) {
            this.getUserProviderData(userId).then((providerData: UserProvider) => {
              const {avatar,fullName, email} = providerData
              const userProfile = new Profile(avatar,fullName,'','',moment().unix(),email)
              resolve(userProfile)
              this.updateUserProfile(userId,userProfile)
            })
          } else {
            resolve(snapshot.data() as Profile)
          }

        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/getUserProfile :' + error.message)))
      })
    }

  public updateUserProfile: (userId: string, profile: Profile)
    => Promise<void> = (userId, profile) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const profileRef = db.doc(`userInfo/${userId}`)

        batch.set(profileRef,{...profile})
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/updateUserProfile' + error.message)))
      })
    }
  public getUsersProfile: (userId: string, lastKey?: string, numberOfItems?: number)
    => Promise<{ [userId: string]: Profile }> = (userId, lastKey, numberOfItems = 15) => {
      return new Promise<{ [userId: string]: Profile }>((resolve, reject) => {
        let usersProfileRef: firebase.firestore.Query
        if (lastKey) {
          usersProfileRef = db.collection(`userInfo`).orderBy('creationDate', 'desc').startAfter(lastKey!).limit(numberOfItems)
        } else {
          usersProfileRef = db.collection(`userInfo`).orderBy('creationDate', 'desc')
        }

        usersProfileRef.get().then((snapshot) => {
          let parsedData: { [userId: string]: Profile } = {}
          snapshot.forEach((result) => {
            parsedData[result.id] = {
              ...result.data() as Profile
            }
          })
          resolve(parsedData)
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  private getUserProviderData = (userId: string) => {
    return new Promise<UserProvider>((resolve,reject) => {
      let userProviderRef = db.doc(`userProviderInfo/${userId}`)
      userProviderRef.get().then((snapshot) => {
        let userProvider: UserProvider = snapshot.data() as UserProvider || {}
        resolve(userProvider)
      })
      .catch((error: any) => {
        reject(new SocialError(error.code, 'firestore/getUserProviderData' + error.message))
      })
    })

  }

}
