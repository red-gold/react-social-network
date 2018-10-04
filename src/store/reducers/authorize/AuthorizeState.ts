/**
 * Post state
 *
 * @export
 * @class AuthorizeState
 */
export class AuthorizeState {

    /**
     * Authorized user identifier
     *
     * @type {number}
     * @memberof AuthorizeState
     */
  uid: number = 0

    /**
     * If user is authed {true} or not {false}
     *
     * @type {boolean}
     * @memberof AuthorizeState
     */
  authed: boolean = false

  /**
   * If user is verifide {true} or not {false}
   *
   * @type {boolean}
   * @memberof AuthorizeState
   */
  isVerifide: boolean = false

    /**
     * If user password is updated {true} or not {false}
     *
     * @type {boolean}
     * @memberof AuthorizeState
     */
  updatePassword: boolean = false

    /**
     * If the user is guest {true} or not {false}
     *
     * @type {boolean}
     * @memberof AuthorizeState
     */
  guest: boolean = false
}
