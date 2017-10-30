
export interface IUserBoxComponentState {

  /**
   * Add new circle button is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IUserBoxComponentState
   */
  disabledAddCircle: boolean

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
}
