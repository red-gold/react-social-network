import { Circle, UserTie } from 'src/core/domain/circles'
import {Map} from 'immutable'

/**
 * Circle state
 */
export class CircleState {
  [key: string]: any
  /**
   * The list of users belong to users circle
   */
  userTies: Map<string, UserTie> = Map({})

  /**
   * The list of users belong to users circle
   */
  userTieds: Map<string, UserTie> = Map({})

  /**
   * The list of circle of current user
   */
  circleList: Map<string, Circle> = Map({})

  /**
   * Whether select circle box is open for the selected user
   */
  selectCircleStatus: { [userId: string]: boolean }

  /**
   * Whether following loading is shown for the selected user
   */
  followingLoadingStatus: { [userId: string]: boolean }

  /**
   * Keep selected circles for refere user
   */
  selectedCircles: Map<string, string[]> = Map({})

  /**
   * Whether the select circles box for referer user is open
   */
  openSelecteCircles: { [userId: string]: boolean }

  /**
   * If user circles are loaded {true} or not {false}
   */
  loaded: boolean = false

  /**
   * Circle stting state
   */
  openSetting: {[circleId: string]: boolean }
}
