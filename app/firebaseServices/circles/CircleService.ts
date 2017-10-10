// - Import react components
import { firebaseRef, firebaseAuth } from 'app/firebase/'


import { SocialError } from 'domain/common'
import { ICircleService } from 'services/circles'
import { Circle, UserFollower } from 'domain/circles'
import { User } from 'domain/users'

/**
 * Firbase circle service
 * 
 * @export
 * @class CircleService
 * @implements {ICircleService}
 */
export class CircleService implements ICircleService {

    addCircle: (userId: string, circle: Circle) => Promise<string>
    addFollowingUser: (userId: string, circleId: string, userCircle: User, userFollower: UserFollower, userFollowingId: string) => Promise<void>
    deleteFollowingUser: (userId: string, circleId: string, userFollowingId: string) => Promise<void>
    updateCircle: (userId: string, circle: Circle, circleId: string) => Promise<void>
    deleteCircle: (circleId: string, userId: string) => Promise<void>
    getCircles: () => Promise<{ [circleId: string]: Circle }>
    getCirclesByUserId: (userId: string) => Promise<{ [circleId: string]: Circle }>

}