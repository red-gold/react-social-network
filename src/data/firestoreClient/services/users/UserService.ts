// - Import react components
import firebase, { firebaseAuth, db, firebaseRef } from 'data/firestoreClient'
import moment from 'moment/moment'
import algoliasearch from 'algoliasearch'
import config from 'src/config'
import { SocialError } from 'core/domain/common'
import { User, UserProvider } from 'core/domain/users'
import { IUserService } from 'core/services/users'
import { injectable, inject } from 'inversify'
import { Map, fromJS } from 'immutable'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { IHttpService } from 'core/services/webAPI/IHttpService'
import { UserIndex } from 'core/domain/users/userIndex'
import * as R from 'ramda'

/**
 * Firbase user service
 */
@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(SocialProviderTypes.Httpervice) private _httpService: IHttpService
  ) {
    this.getSearchKey = this.getSearchKey.bind(this)
    this.searchUser = this.searchUser.bind(this)
  }

  /**
   * Get user profile
   */
  public getUserProfile: (userId: string)
    => Promise<User> = (userId) => {
      return new Promise<User>((resolve, reject) => {
        let userProfileRef = db.doc(`userInfo/${userId}`)
        userProfileRef.get().then((result) => {
          if (!result.exists) {
            this.getUserProviderData(userId).then((providerData: UserProvider) => {
              if (!UserProvider || !providerData.email) {
                reject(reject(new SocialError(`firestore/providerdata`, 'firestore/getUserProfile : Provider data or email of provider data is empty!')))
              }
              const { avatar, fullName, email } = providerData
              const userProfile = new User(avatar, fullName && fullName !== '' ? fullName : email, '', '', moment().unix(), email, -1, '', '', '')
              resolve(userProfile)
              this.updateUserProfile(userId, userProfile)
            })
          } else {
            resolve(result.data() as User)
          }

        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/getUserProfile :' + error.message)))
      })
    }

  /**
   * Update user profile
   */
  public updateUserProfile: (userId: string, profile: User)
    => Promise<void> = (userId, profile) => {
      return new Promise<void>((resolve, reject) => {
        profile = R.reject(R.isNil, profile) as User
        const batch = db.batch()
        const profileRef = db.doc(`userInfo/${userId}`)

        batch.set(profileRef, { ...profile, userId, state: 'active' })
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/updateUserProfile' + error.message)))
      })
    }

  /**
   * Increase share count
   */
  public increaseShareCount: (userId: string)
    => Promise<void> = (userId) => {
      return new Promise<void>((resolve, reject) => {
        const voteRef = db.collection('userInfo').doc(userId)
        var transaction = db.runTransaction(t => {
          return t.get(voteRef)
            .then(doc => {
              if (doc.exists) {
                const shareCount = doc.data()!.shareCount
                let newShareCount = 1
                if (shareCount && shareCount > 0) {
                  newShareCount = shareCount + 1
                }
                t.update(voteRef, { shareCount: newShareCount })
              }
            })
        }).then(result => {
          console.log('Transaction success!')
          resolve()
        }).catch(err => {
          console.log('Transaction failure:', err)
          reject(err)
        })
      })
    }

  /**
   * Decrease share count
   */
  public decreaseShareCount: (userId: string)
    => Promise<void> = (userId) => {
      return new Promise<void>((resolve, reject) => {
        const voteRef = db.collection('userInfo').doc(userId)
        var transaction = db.runTransaction(t => {
          return t.get(voteRef)
            .then(doc => {
              if (doc.exists) {
                const shareCount = doc.data()!.shareCount
                let newShareCount = 0
                if (shareCount && shareCount > 0) {
                  newShareCount = shareCount - 1
                }
                t.update(voteRef, { shareCount: newShareCount })
              }
            })
        }).then(result => {
          console.log('Transaction success!')
          resolve()
        }).catch(err => {
          console.log('Transaction failure:', err)
          reject(err)
        })
      })
    }

  /**
   * Increase follow count
   */
  public increaseFollowCount: (userId: string)
    => Promise<void> = (userId) => {
      return new Promise<void>((resolve, reject) => {
        const userInfoRef = db.collection('userInfo').doc(userId)
        var transaction = db.runTransaction(t => {
          return t.get(userInfoRef)
            .then(doc => {
              if (doc.exists) {
                const followCount = doc.data()!.followCount
                let newFollowCount = 1
                if (followCount && followCount > 0) {
                  newFollowCount = followCount + 1
                }
                t.update(userInfoRef, { followCount: newFollowCount })
              }
            })
        }).then(result => {
          console.log('Transaction success!')
          resolve()
        }).catch(err => {
          console.log('Transaction failure:', err)
          reject(err)
        })
      })
    }

  /**
   * Initialize user status
   */
  initUserStatus = (uid: string) => {
    var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid)

    // Firestore uses a different server timestamp value, so we'll 
    // create two more constants for Firestore state.
    var isOfflineForFirestore = {
      state: 'offline',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }

    var isOnlineForFirestore = {
      state: 'online',
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    }

    firebase.database().ref('.info/connected').on('value', (snapshot) => {
      if (snapshot && snapshot.val() === false) {
        // Instead of simply returning, we'll also set Firestore's state
        // to 'offline'. This ensures that our Firestore cache is aware
        // of the switch to 'offline.'
        userStatusFirestoreRef.set(isOfflineForFirestore)
        return
      }

      // userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
      //   userStatusDatabaseRef.set(isOnlineForDatabase)

        // We'll also add Firestore set here for when we come online.
        userStatusFirestoreRef.set(isOnlineForFirestore)
      })
    // })
  }

  /**
   * Decrease follow count
   */
  public decreaseFollowCount: (userId: string)
    => Promise<void> = (userId) => {
      return new Promise<void>((resolve, reject) => {
        const userInfoRef = db.collection('userInfo').doc(userId)
        var transaction = db.runTransaction(t => {
          return t.get(userInfoRef)
            .then(doc => {
              if (doc.exists) {
                const followCount = doc.data()!.followCount
                let newFollowCount = 0
                if (followCount && followCount > 0) {
                  newFollowCount = followCount - 1
                }
                t.update(userInfoRef, { followCount: newFollowCount })
              }
            })
        }).then(result => {
          console.log('Transaction success!')
          resolve()
        }).catch(err => {
          console.log('Transaction failure:', err)
          reject(err)
        })
      })
    }

  /**
   * Get list of post by user identifier
   */
  public async searchUser(query: string, filters: string, page: number, limit: number, searchKey: string) {
    const searchClient = algoliasearch(config.algolia.appId, searchKey)
    const userIndex = searchClient.initIndex('user')
    const resultSearch: algoliasearch.Response = await userIndex
      .search({
        query,
        page,
        filters,
        hitsPerPage: limit
      })
    const pageCount = resultSearch.nbPages - 1
    const userCount = resultSearch.nbHits
    let parsedData: Map<string, any> = Map({})
    let userIds: Map<string, boolean> = Map({})
    resultSearch.hits.forEach((user) => {
      const mapUser = UserIndex.mapToUser(user)
      parsedData = parsedData.set(mapUser.userId!, fromJS({ ...mapUser }))
      userIds = userIds.set(mapUser.userId!, true)
    })
    return { users: parsedData, ids: userIds, hasMore: !(pageCount === page || page! > pageCount) }
  }

  /**
   * Get search key
   */
  public async getSearchKey() {
    const result = await this._httpService.get('search/user')
    return result.data.searchKey
  }

  /**
   * Get users profile
   */
  public getUsersProfile: (userId: string, lastUserId?: string, page?: number, limit?: number)
    => Promise<{ users: { [userId: string]: User }[], newLastUserId: string }> = (userId, lastUserId, page, limit = 10) => {
      return new Promise<{ users: { [userId: string]: User }[], newLastUserId: string }>((resolve, reject) => {
        let parsedData: { [userId: string]: User }[] = []

        let query = db.collection('userInfo').where('state', '==', 'active')
        if (lastUserId && lastUserId !== '') {
          query = query.orderBy('userId').orderBy('creationDate', 'desc').startAfter(lastUserId)
        }
        if (limit) {
          query = query.limit(limit)
        }

        query.get().then((users) => {
          let newLastUserId = users.size > 0 ? users.docs[users.docs.length - 1].id : ''
          users.forEach((result) => {
            const user = result.data() as User
            parsedData = [
              ...parsedData,
              {
                [result.id]: {
                  ...user
                }
              }

            ]
          })
          resolve({ users: parsedData, newLastUserId })
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  /**
   * Get uesr provider data
   */
  private getUserProviderData = (userId: string) => {
    return new Promise<UserProvider>((resolve, reject) => {
      
      let userProviderRef = db.doc(`userProviderInfo/${userId}`)
      userProviderRef.get().then((snapshot) => {
        if (snapshot.exists) {
          let userProvider: UserProvider = snapshot.data() as UserProvider || {}
          resolve(userProvider)
        } else {
          throw new SocialError(`firestore/getUserProviderData/notExist `, `document of userProviderRef is not exist `)
        }
      })
        .catch((error: any) => {
          reject(new SocialError(error.code, 'firestore/getUserProviderData ' + error.message))
        })
    })

  }

}
