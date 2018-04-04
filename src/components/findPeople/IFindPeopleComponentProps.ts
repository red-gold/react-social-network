import { Profile } from 'core/domain/users/profile'
import { UserTie } from 'core/domain/circles'

export interface IFindPeopleComponentProps {

  /**
   * Load users' profile
   *
   * @memberof IFindPeopleComponentProps
   */
  loadPeople?: (page: number, limit: number) => any

  /**
   * Users' profile
   */
  peopleInfo?: Map<string, UserTie>

  /**
   * If there are more people {true} or not {false}
   */
  hasMorePeople?: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
