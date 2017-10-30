export interface ISidebarComponentProps {

  /**
   * Change sidebar status
   *
   * @type {boolean}
   * @memberof ISidebarComponentProps
   */
  status: (status: boolean) => void

  /**
   * Change sidebar overlay status
   *
   * @memberof ISidebarComponentProps
   */
  overlay: (status: boolean) => void

  /**
   * Open sidebar callback function
   *
   * @memberof ISidebarComponentProps
   */
  open: (openCallback: (status: boolean, source: string) => void ) => void
}
