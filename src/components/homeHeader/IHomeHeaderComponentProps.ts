import StringAPI from 'api/StringAPI'
export interface IHomeHeaderComponentProps {

  /**
   * Sidebar is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeHeaderComponentProps
   */
  drawerStatus: boolean

  /**
   * Logout user
   *
   * @memberof IHomeHeaderComponentProps
   */
  logout?: () => void

  /**
   * Handle on resize window event
   *
   * @memberof IHomeHeaderComponentProps
   */
  handleResize?: (event: any) => void

  /**
   * Number of notifications
   *
   * @memberof IHomeHeaderComponentProps
   */
  notifyCount?: number

  /**
   * User full name
   *
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  fullName?: string

  /**
   * User's avatar URL address
   *
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  avatar?: string

  /**
   * Top bar title
   *
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  title?: string

  /**
   * Toggle sidebar
   *
   * @memberof IHomeHeaderComponentProps
   */
  onToggleDrawer: () => void

  /**
   * Material ui theme style
   */
  classes?: any
    
  /**
   * Theme
   */
  theme?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
