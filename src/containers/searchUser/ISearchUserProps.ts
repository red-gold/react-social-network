import { UserTie } from 'core/domain/circles'
import {Map, List} from 'immutable'

export interface ISearchUserProps {

  /**
   * Search posts
   */
  search: (query: string, page: number, limit: number) => any
  
  /**
   * Theme
   */
  history?: any
  
  /**
   * Router match
   */
  location: any

  /**
   * Users' profile
   */
  peopleInfo?: List<Map<string, any>>

  /**
   * If there are more people {true} or not {false}
   */
  hasMorePeople?: boolean

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any, params?: any) => any

}
