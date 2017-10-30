
export interface IHomeComponentState {

  /**
   * Change sidebar status to {open(status:true)/close(status:false)}
   *
   * @type {(status: boolean, state: string)}
   * @memberof IHomeComponentState
   */
  sidebarOpen: (status: boolean, source: string) => void

  /**
   * Sidebar status
   *
   * @type {boolean}
   * @memberof IHomeComponentState
   */
  sidebarStatus: boolean

  /**
   * Sidebar overlay status
   *
   * @type {boolean}
   * @memberof IHomeComponentState
   */
  sidebarOverlay: boolean
}
