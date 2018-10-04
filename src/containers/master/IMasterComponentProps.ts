import { User } from 'src/core/domain/users'
import { UserClaim } from 'core/domain/authorize/userClaim'
export interface IMasterComponentProps {
    /**
     * Close gloal message
     */
  closeMessage: Function
    /**
     * Show progress bar information
     */
  progress: any
    /**
     * Login a user
     */
  login: (user: UserClaim) => any
    /**
     * Global state
     */
  global: any
    /**
     * Set flag {false} which user data has not loaded
     */
  defaultDataDisable: Function
    /**
     * Logout current user
     */
  logout: Function
    /**
     * Clear user date from store
     */
  clearData: Function
    /**
     * Prepare default data for a guest user
     */
  loadDataGuest: Function
    /**
     * Set flag {true} which all user data has loaded
     */
  defaultDataEnable: Function
    /**
     * Load user data into store
     */
  loadData: Function
    /**
     * If all data from all entities are loaded {true} if not {false}
     *
     * @type {Boolean}
     * @memberof IMasterProps
     */
  loaded: Boolean
    /**
     * If current user is guest {true} if no
     *
     * @type {Boolean}
     * @memberof IMasterProps
     */
  guest: Boolean
    /**
     * If current user is authed {true} if not {false}
     *
     * @type {Boolean}
     * @memberof IMasterProps
     */
  authed: Boolean
    /**
     * Authed user identifier
     *
     * @type {string}
     * @memberof IMasterProps
     */
  uid: string

  /**
   * Show master loading
   */
  showMasterLoading?: () => any

  /**
   * Hide master loading
   */
  hideMasterLoading?: () => any

  /**
   * Whether send feesback box is visible
   */
  sendFeedbackStatus?: boolean

  /**
   * Hide global message
   */
  hideMessage?: () => any

  /**
   * Subscibe auth state change
   */
  subscribeAuthStateChange?: () => any

}
