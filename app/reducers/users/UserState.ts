import { User,Profile } from 'domain/users'

/**
 * User state 
 * 
 * @export
 * @class UserState
 */
export class UserState  {
    /**
     * The list of users information
     * 
     * @type {({[userId: string]: Profile} | null)}
     * @memberof UserState
     */
    info: {[userId: string]: Profile} = {}

    /**
     * If users profile are loaded
     * 
     * @type {Boolean}
     * @memberof UserState
     */
    loaded: Boolean = false

    /**
     * If edit profile is open {true} or not {false}
     * 
     * @type {Boolean}
     * @memberof UserState
     */
    openEditProfile: Boolean = false
  }