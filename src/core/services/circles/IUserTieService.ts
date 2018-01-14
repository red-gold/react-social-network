import { User, Profile } from 'core/domain/users'
import { UserTie } from 'core/domain/circles'

/**
 * User tie service interface
 *
 * @export
 * @interface IUserTieService
 */
export interface IUserTieService {

  /**
   * Tie users
   */
  tieUseres: (userTieSenderInfo: UserTie, userTieReceiveInfo: UserTie, circleIds: string[])
    => Promise<void>

  /**
   * Update users tie
   */
  updateUsersTie: (userTieSenderInfo: UserTie, userTieReceiveInfo: UserTie, circleIds: string[])
  => Promise<void>

  /**
   * Remove users' tie
   */
  removeUsersTie: (firstUserId: string, secondUserId: string)
    => Promise<void>

  /**
   * Get user ties
   */
  getUserTies: (userId: string)
    => Promise<{[userId: string]: UserTie}>

  /**
   * Get the users who tied current user
   */
  getUserTieSender: (userId: string)
    => Promise<{[userId: string]: UserTie}>
}
