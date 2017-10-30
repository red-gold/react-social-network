import { UserFollower } from 'core/domain/circles'

export interface IFollowersComponentProps {

  /**
   * User followers info
   *
   * @type {{[userId: string]: UserFollower}}
   * @memberof IFindPeopleComponentProps
   */
  followers?: {[userId: string]: UserFollower}
}
