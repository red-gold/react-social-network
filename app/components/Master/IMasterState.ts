
export interface IMasterState {
    /**
     * Loding will be appeared if it's true
     *
     * @type {Boolean}
     * @memberof IMasterState
     */
  loading: Boolean,
     /**
      * It's true if user is authorized
      *
      * @type {Boolean}
      * @memberof IMasterState
      */
  authed: Boolean
      /**
       * It's true if all default data loaded from database
       *
       * @type {Boolean}
       * @memberof IMasterState
       */
  dataLoaded: Boolean
}
