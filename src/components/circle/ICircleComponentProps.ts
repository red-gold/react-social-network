import { Comment } from 'core/domain/comments'
import { Profile } from 'core/domain/users'
import { Circle, UserTie } from 'core/domain/circles'
import {Map} from 'immutable'

export interface ICircleComponentProps {

  /**
   * Circle
   */
  circle: Map<string, any>

  /**
   * Circle identifier
   */
  id: string

  /**
   * User identifier
   */
  uid: string

  /**
   * Update circle
   */
  updateCircle?: Function

  /**
   * Delete circle
   */
  deleteCircle?: Function

  /**
   * Users of current circle
   */
  usersOfCircle?: Map<string, any>

  /**
   * Close setting box of circle
   */
  closeCircleSettings?: any

  /**
   * Circle setting dialog is open {true} or not {false}
   */
  openSetting?: boolean

  /**
   * Change route location
   */
  goTo?: (url: string) => void

  /**
   * Open setting box for a circle
   */
  openCircleSettings?: () => any

  /**
   * Styles
   */
  classes?: any
}
