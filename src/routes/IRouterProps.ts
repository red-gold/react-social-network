export interface IRouterProps {
  /**
   * Enable routing {true} or not {false}
   *
   * @type {boolean}
   * @memberof IRouterProps
   */
  enabled: boolean

  /**
   * Router data for the components in routing
   *
   * @type {*}
   * @memberof IRouterProps
   */
  data?: any

  /**
   * Routing match
   *
   * @type {*}
   * @memberof IRouterProps
   */
  match?: any

}
