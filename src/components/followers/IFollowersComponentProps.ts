import { UserTie } from 'core/domain/circles'
import {Map, List} from 'immutable'

export interface IFollowersComponentProps {

  /**
   * User followers info
   */
  followers?: List<Map<string, any>>

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
