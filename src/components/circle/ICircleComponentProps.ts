import { Comment } from 'core/domain/comments'
import { Profile } from 'core/domain/users'
import { Circle, UserTie } from 'core/domain/circles'

export interface ICircleComponentProps {

  /**
   *
   *
   * @type {Circle}
   * @memberof ICircleComponentProps
   */
  circle: Circle

  /**
   * Circle identifier
   *
   * @type {string}
   * @memberof ICircleComponentProps
   */
  id: string

  /**
   * User identifier
   *
   * @type {string}
   * @memberof ICircleComponentProps
   */
  uid: string

  /**
   *
   *
   * @type {Function}
   * @memberof ICircleComponentProps
   */
  updateCircle?: Function

  /**
   *
   *
   * @type {Function}
   * @memberof ICircleComponentProps
   */
  deleteCircle?: Function

  /**
   * Users of current circle
   */
  usersOfCircle?: {[userId: string]: UserTie}

  /**
   * Close setting box of circle
   *
   * @type {Function}
   * @memberof ICircleComponentProps
   */
  closeCircleSettings?: any

  /**
   * Circle setting dialog is open {true} or not {false}
   *
   * @type {Function}
   * @memberof ICircleComponentProps
   */
  openSetting?: boolean

  /**
   * Change route location
   *
   * @memberof ICircleComponentProps
   */
  goTo?: (url: string) => void

  /**
   * Open setting box for a circle
   *
   * @memberof ICircleComponentProps
   */
  openCircleSettings?: () => any
}
