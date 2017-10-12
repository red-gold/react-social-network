import { User } from 'domain/users'
import { Circle, UserFollower } from 'domain/circles'

/**
 * Circle service interface
 *
 * @export
 * @interface ICircleService
 */
export interface ICircleService {

  addCircle: (userId: string, circle: Circle) => Promise<string>
  addFollowingUser: (userId: string, circleId: string, userCircle: User, userFollower: UserFollower, userFollowingId: string) => Promise<void>
  deleteFollowingUser: (userId: string, circleId: string,userFollowingId: string) => Promise<void>
  updateCircle: (userId: string, circleId: string, circle: Circle) => Promise<void>
  deleteCircle: (userId: string, circleId: string) => Promise<void>
  getCircles: (userId: string) => Promise<{ [circleId: string]: Circle }>
}
