
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
   * Circle list popover is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof IUserBoxComponentState
   */
  open: boolean

  /**
   * Whether current user changed the selected circles for referer user
   *
   */
  disabledDoneCircles: boolean

  /**
   * Keep selected circles for refere user
   */
  selectedCircles: string[]
}
