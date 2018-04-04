import { UserTie } from 'core/domain/circles'
import {Map} from 'immutable'

export interface IFollowersComponentProps {

  /**
   * User followers info
   */
  followers?: Map<string, UserTie>

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
