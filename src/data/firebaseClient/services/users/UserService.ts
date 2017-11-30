// - Import react components
import { firebaseRef, firebaseAuth } from 'data/firebaseClient'
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
        let userProfileRef: any = firebaseRef.child(`users/${userId}/info`)

        userProfileRef.once('value').then((snapshot: any) => {
          let userProfile: Profile = snapshot.val() || {}
          if (Object.keys(userProfile).length === 0 && userProfile.constructor === Object) {
            this.getUserProviderData(userId).then((providerData: UserProvider) => {
              const {avatar,fullName, email} = providerData
              const userProfile = new Profile(avatar,fullName,'','', moment().unix(),email)
              resolve(userProfile)
              this.updateUserProfile(userId,userProfile)
            })
          } else {
            resolve(userProfile)
          }

        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  public updateUserProfile: (userId: string, profile: Profile)
    => Promise<void> = (userId, profile) => {
      return new Promise<void>((resolve, reject) => {
        let updates: any = {}

        updates[`users/${userId}/info`] = profile
        firebaseRef.update(updates).then(() => {
          resolve()
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }
  public getUsersProfile: (userId: string, page?: number, lastKey?: string)
    => Promise<{ [userId: string]: Profile }> = (userId, page, lastKey) => {
      return new Promise<{ [userId: string]: Profile }>((resolve, reject) => {
        let usersProfileRef: any
        if (page) {
          const numberOfItems = (page * 12) + 12
          usersProfileRef = firebaseRef.child(`users`).orderByKey().startAt(lastKey!).limitToFirst(numberOfItems)
        } else {
          usersProfileRef = firebaseRef.child(`users`).orderByKey()
        }

        usersProfileRef.once('value').then((snapshot: any) => {
          let usersProfile: any = snapshot.val() || {}
          let parsedusersProfile: { [userId: string]: Profile } = {}
          Object.keys(usersProfile).forEach((userKey) => {
            if (userId !== userKey) {
              let userInfo = usersProfile[userKey].info
              parsedusersProfile[userKey] = {
                avatar: userInfo.avatar,
                email: userInfo.email,
                fullName: userInfo.fullName,
                banner: userInfo.banner,
                tagLine: userInfo.tagLine
              }
            }
          })
          resolve(parsedusersProfile)
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  private getUserProviderData = (userId: string) => {
    return new Promise<UserProvider>((resolve,reject) => {
      let userProviderRef: any = firebaseRef.child(`users/${userId}/providerInfo`)
      userProviderRef.once('value').then((snapshot: any) => {
        let userProviderRef: any = firebaseRef.child(`users/${userId}/info`)
        let userProvider: UserProvider = snapshot.val() || {}
        console.log('----------------userProfile')
        console.log(userProvider)
        console.log('-----------------------')
        resolve(userProvider)
      })
      .catch((error: any) => {
        reject(new SocialError(error.code, error.message))
      })
    })

  }

}
