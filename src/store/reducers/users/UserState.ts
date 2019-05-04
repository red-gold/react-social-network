import { Map } from 'immutable';

/**
 * User state
 *
 * @export
 * @class UserState
 */
export class UserState {
    /**
     * The list of users information
     */
  info: Map<string,  any> = Map({})

    /**
     * If users profile are loaded
     */
  loaded: Boolean = false

    /**
     * If edit profile is open {true} or not {false}
     */
  openEditProfile: Boolean = false

  /**
   * People data storage
   */
  people?: Map<string, any> = Map({hasMoreData: true, lastPageRequest: 0, lastUserId: ''})
}
