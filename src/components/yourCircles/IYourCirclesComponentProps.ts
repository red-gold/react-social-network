import { Circle } from 'core/domain/circles'
import {Map} from 'immutable'
export interface IYourCirclesComponentProps {

  /**
   * Circles
   */
  circles?: Map<string, Map<string, any>>

  /**
   * User identifier
   */
  uid?: string
}
