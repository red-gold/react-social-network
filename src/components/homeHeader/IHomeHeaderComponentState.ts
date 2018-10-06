
export interface IHomeHeaderComponentState {
  [key: string]: any 
  /**
   * Popover menu on avatar is open {true} or not {false}
   */
  openAvatarMenu: boolean

  /**
   * Show top bar title {true} or not {false}
   */
  showTitle: boolean

  /**
   * Notification menu is open {true} or not {false}
   */
  openNotifyMenu: boolean

  /**
   * Recent chat menu is open {true} or not {false}
   */
  openRecentChatMenu: boolean

  /**
   * Search text
   */
  searchText: string

  /**
   * Whether current page is search page
   */
  isSearchPage: boolean

  /**
   * The location of previous page before redirecting to the 
   */
  previousLocation: string

  /**
   * This is the DOM element that will be used to set the position of the popover for notification.
   */
  anchorElNotify?: HTMLElement | null

  /**
   * This is the DOM element that will be used to set the position of the popover for avatar menu.
   */
  anchorElAvatar?: HTMLElement | null

  /**
   * This is the DOM element that will be used to set the position of the popover for recent chat.
   */
  anchorElRecentChat?: HTMLElement | null
}
