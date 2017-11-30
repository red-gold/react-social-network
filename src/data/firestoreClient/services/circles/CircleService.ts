// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'

import { SocialError } from 'core/domain/common'
import { ICircleService } from 'core/services/circles'
import { Circle, UserFollower } from 'core/domain/circles'
import { User } from 'core/domain/users'

/**
 * Firbase circle service
 *
 * @export
 * @class CircleService
 * @implements {ICircleService}
 */
export class CircleService implements ICircleService {

  public addCircle: (userId: string, circle: Circle)
    => Promise<string> = (userId, circle) => {
      return new Promise<string>((resolve,reject) => {
        let circleRef = db.doc(`users/${userId}`).collection(`circles`).add(circle)
        circleRef.then((result) => {
          resolve(result.id as string)
        })

      })

    }

  public addFollowingUser: (userId: string, circleId: string, userCircle: User, userFollower: UserFollower, userFollowingId: string)
    => Promise<void> = (userId, circleId, userCircle, userFollower, userFollowingId) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const followerRef = db.doc(`users/${userId}/circles/${circleId}/users/${userFollowingId}`)
        const followingRef = db.doc(`users/${userFollowingId}/circles/-Followers/users/${userId}`)

        batch.update(followerRef, userCircle)
        batch.update(followingRef, userFollower)
        batch.commit().then(() => {
          resolve()
        })
      .catch((error: any) => {
        reject(new SocialError(error.code, error.message))
      })

      })
    }
  public deleteFollowingUser: (userId: string, circleId: string, userFollowingId: string)
    => Promise<void> = (userId, circleId, userFollowingId) => {
      return new Promise<void>((resolve,reject) => {

        const batch = db.batch()
        const followerRef = db.doc(`users/${userId}/circles/${circleId}/users/${userFollowingId}`)
        const followingRef = db.doc(`users/${userFollowingId}/circles/-Followers/users/${userId}`)

        batch.delete(followerRef)
        batch.delete(followingRef)
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }
  public updateCircle: (userId: string, circleId: string, circle: Circle)
    => Promise<void> = (userId, circleId, circle) => {
      return new Promise<void>((resolve,reject) => {

        const batch = db.batch()
        const circleRef = db.doc(`users/${userId}/circles/${circleId}`)

        batch.update(circleRef,circle)
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public deleteCircle: (userId: string, circleId: string)
    => Promise<void> = (userId, circleId) => {
      return new Promise<void>((resolve,reject) => {

        const batch = db.batch()
        const circleRef = db.doc(`users/${userId}/circles/${circleId}`)

        batch.delete(circleRef)
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }
  public getCircles: (userId: string) => Promise<{ [circleId: string]: Circle }> = (userId) => {
    return new Promise<{ [circleId: string]: Circle }>((resolve,reject) => {
      let circlesRef = db.doc(`users/${userId}`).collection(`circles`)

      circlesRef.onSnapshot((snapshot) => {
        let parsedData: { [circleId: string]: Circle } = {}
        snapshot.forEach((result) => {
          parsedData[result.id] = {
            id: result.id,
            ...result.data() as Circle
          }
        })
        resolve(parsedData)
      })

    })
  }
}
