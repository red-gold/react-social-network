import { UserTie } from 'core/domain/circles'
import {Map, List} from 'immutable'

export interface IFindPeopleComponentProps {

  /**
   * Load users' profile
   */
  loadPeople?: (page: number, limit: number) => any

  /**
   * Current page number
   */
  page?: number

  /**
   * Increase page
   */
  increasePage?: () => any

  /**
   * Users' profile
   */
  peopleInfo?: List<Map<string, any>>

  /**
   * If there are more people {true} or not {false}
   */
  hasMorePeople?: boolean

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

}
