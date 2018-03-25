import { User } from 'src/core/domain/users'
export interface IMasterComponentProps {
    /**
     * Close gloal message
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  closeMessage: Function
    /**
     * Show progress bar information
     *
     * @type {*}
     * @memberof IMasterProps
     */
  progress: any
    /**
     * Login a user
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  login: (userId: string, isVerifide: boolean) => any
    /**
     * Global state
     *
     * @type {*}
     * @memberof IMasterProps
     */
  global: any
    /**
     * Set flag {false} which user data has not loaded
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  defaultDataDisable: Function
    /**
     * Logout current user
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  logout: Function
    /**
     * Clear user date from store
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  clearData: Function
    /**
     * Prepare default data for a guest user
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  loadDataGuest: Function
    /**
     * Set flag {true} which all user data has loaded
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  defaultDataEnable: Function
    /**
     * Load user data into store
     *
     * @type {Function}
     * @memberof IMasterProps
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

}
