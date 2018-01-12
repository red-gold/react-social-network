import { User } from 'core/domain/users'
import { Circle, UserTie } from 'core/domain/circles'

/**
 * Circle service interface
 *
 * @export
 * @interface ICircleService
 */
export interface ICircleService {

  addCircle: (userId: string, circle: Circle) => Promise<string>
  updateCircle: (userId: string, circleId: string, circle: Circle) => Promise<void>
  deleteCircle: (userId: string, circleId: string) => Promise<void>
  getCircles: (userId: string) => Promise<{ [circleId: string]: Circle }>
}
