import { UserTie } from 'core/domain/circles'
import {Map} from 'immutable'

export interface IFollowingComponentProps {

  followingUsers?: Map<string, UserTie>

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
