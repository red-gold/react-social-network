import { Profile } from 'core/domain/users/profile'

export interface IFindPeopleComponentProps {

  /**
   * Load users' profile
   *
   * @memberof IFindPeopleComponentProps
   */
  loadPeople?: () => any

  /**
   * Users' profile
   *
   * @type {{[userId: string]: Profile}}
   * @memberof IFindPeopleComponentProps
   */
  peopleInfo?: {[userId: string]: Profile}

}
