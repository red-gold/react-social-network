// - Import react components
import { firebaseRef, firebaseAuth } from 'app/firebase/'

import { SocialError } from 'domain/common'
import { Profile } from 'domain/users'
import { IUserService } from 'services/users'

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
      return new Promise<Profile>((resolve,reject) => {
        let userProfileRef: any = firebaseRef.child(`users/${userId}/info`)

        userProfileRef.once('value').then((snapshot: any) => {
          let userProfile: Profile = snapshot.val() || {}
          resolve(userProfile)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public updateUserProfile: (userId: string, profile: Profile)
   => Promise<void> = (userId, profile) => {
     return new Promise<void>((resolve,reject) => {
       let updates: any = {}

       updates[`users/${userId}/info`] = profile
       firebaseRef.update(updates).then(() => {
         resolve()
       })
      .catch((error: any) => {
        reject(new SocialError(error.code,error.message))
      })
     })
   }
  public getUsersProfile: (userId: string)
    => Promise<{ [userId: string]: Profile }> = (userId) => {
      return new Promise<{ [userId: string]: Profile }>((resolve,reject) => {
        let usersProfileRef: any = firebaseRef.child(`users`)

        usersProfileRef.once('value').then((snapshot: any) => {
          let usersProfile: any = snapshot.val() || {}
          let parsedusersProfile: {[userId: string]: Profile} = {}
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
          reject(new SocialError(error.code,error.message))
        })
      })
    }

}
