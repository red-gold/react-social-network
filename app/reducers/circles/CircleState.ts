import { Circle } from 'domain/circles'

/**
 * Circle state
 *
 * @export
 * @class CircleState
 */
export class CircleState {
    /**
     * The list of Circles belong to users
     *
     * @type {({[userId: string]: {[circleId: string]: Circle}} | null)}
     * @memberof CircleState
     */
  userCircles: {[userId: string]: {[circleId: string]: Circle}} = {}

    /**
     * If user circles are loaded {true} or not {false}
     *
     * @type {Boolean}
     * @memberof CircleState
     */
  loaded: Boolean = false
}