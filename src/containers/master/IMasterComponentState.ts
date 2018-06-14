
export interface IMasterComponentState {
    /**
     * Loding will be appeared if it's true
     *
     * @type {boolean}
     * @memberof IMasterState
     */
  loading: boolean,
     /**
      * It's true if user is authorized
      *
      * @type {boolean}
      * @memberof IMasterState
      */
  authed: boolean
      /**
       * It's true if all default data loaded from database
       *
       * @type {boolean}
       * @memberof IMasterState
       */
  dataLoaded: boolean

  /**
   * If user verifide it's email {true} or not {false}
   *
   * @type {boolean}
   * @memberof IMasterComponentState
   */
  isVerifide: boolean
}
