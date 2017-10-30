export interface ISidebarContentComponentProps {

  /**
   * Change sidbar status to open/close
   *
   * @memberof ISidebarContentComponentProps
   */
  sidebar?: (status: boolean, source: string) => void

  /**
   * Show sidebar is in overlay status {true} or not {false}
   *
   * @type {boolean}
   * @memberof ISidebarContentComponentProps
   */
  overlay?: boolean

  /**
   * Sidebar content class name
   *
   * @type {string}
   * @memberof ISidebarContentComponentProps
   */
  className?: string

  /**
   * Sidebar content style
   *
   * @type {{}}
   * @memberof ISidebarContentComponentProps
   */
  cstyle?: {}
}
