
export interface IUserBoxComponentState {

  /**
   * Create new circle button is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IUserBoxComponentState
   */
  disabledCreateCircle: boolean

  /**
   * The button of add user in a circle is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IUserBoxComponentState
   */
  disabledAddToCircle: boolean

  /**
   * Circle name
   *
   * @type {string}
   * @memberof IUserBoxComponentState
   */
  circleName: string

  /**
   * Keep element
   *
   * @type {*}
   * @memberof IUserBoxComponentState
   */
  anchorEl?: any

  /**
   * Whether current user changed the selected circles for referer user
   *
   */
  disabledDoneCircles: boolean

}
