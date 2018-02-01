
export interface IHomeHeaderComponentState {

  /**
   * Popover menu on avatar is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeHeaderComponentState
   */
  openAvatarMenu: boolean

  /**
   * Show top bar title {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeHeaderComponentState
   */
  showTitle: boolean

  /**
   * Notification menu is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeHeaderComponentState
   */
  openNotifyMenu: boolean

  /**
   * This is the DOM element that will be used to set the position of the popover.
   *
   * @type {*}
   * @memberof IHomeHeaderComponentState
   */
  anchorEl?: HTMLElement | null
}
