
export interface ICircleComponentState {

  /**
   * Circle name
   *
   * @type {string}
   * @memberof ICircleComponentState
   */
  circleName: string

  /**
   * If circle user list is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICircleComponentState
   */
  open: boolean

  /**
   * Save button is disabled {true} or not false
   *
   * @type {boolean}
   * @memberof ICircleComponentState
   */
  disabledSave: boolean

  /**
   * Keep menu anchor
   */
  anchorElMenu: any
}
