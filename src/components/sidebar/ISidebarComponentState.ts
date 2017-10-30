
export interface ISidebarComponentState {

  sidebarClass?: string
  overlay?: boolean
  mainStyle?: {}
    // Is sidebar open or not
  open?: boolean
    // If sidebar is closed by resizing or not
  auto?: boolean
    // If overlay should be open or not
  overlayOpen?: boolean
    // If side bar should be closed
  shouldBeClosed?: boolean

  /**
   * Sidebar style sheet
   *
   * @type {{}}
   * @memberof ISidebarComponentState
   */
  sidebarStyle?: {}
}
