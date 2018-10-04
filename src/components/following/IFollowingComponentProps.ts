import { UserTie } from 'core/domain/circles'
import {Map, List} from 'immutable'

export interface IFollowingComponentProps {

  followingUsers?: List<Map<string, any>>

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
