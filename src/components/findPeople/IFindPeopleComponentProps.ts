import { Profile } from 'core/domain/users/profile'

export interface IFindPeopleComponentProps {

  /**
   * Load users' profile
   *
   * @memberof IFindPeopleComponentProps
   */
  loadPeople?: (page: number, limit: number) => any

  /**
   * Users' profile
   *
   * @type {{[userId: string]: Profile}}
   * @memberof IFindPeopleComponentProps
   */
  peopleInfo?: {[userId: string]: Profile}

  /**
   * If there are more people {true} or not {false}
   */
  hasMorePeople?: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
