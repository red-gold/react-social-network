import StringAPI from 'api/StringAPI'
export interface IHomeHeaderComponentProps {

  /**
   * Sidebar is open {true} or not {false}
   */
  drawerStatus: boolean

  /**
   * Logout user
   */
  logout?: () => void

  /**
   * Handle on resize window event
   */
  handleResize?: (event: any) => void

  /**
   * Number of notifications
   */
  notifyCount?: number

  /**
   * User full name
   */
  fullName?: string

  /**
   * Location
   */
  location?: any

  /**
   * History router
   */
  history?: any

  /**
   * User's avatar URL address
   */
  avatar?: string

  /**
   * Top bar title
   */
  title?: string

  /**
   * Toggle sidebar
   */
  onToggleDrawer: () => void

  /**
   * Set current chat
   */
  setCurrentChat?: (receiverId: string) => any

  /**
   * Redirect to URL
   */
  goTo?: (url: string) => any

  /**
   * Material ui theme style
   */
  classes?: any

  /**
   * Window width
   */
  width?: any

  /**
   * Theme
   */
  theme?: any

  /**
   * Whether recent chat is open
   */
  recentChatOpen?: boolean

  /**
   * Open recent chat
   */
  openRecentChat?: () => any

  /**
   * Close recent chat
   */
  closeRecentChat?: () => any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Whether edit profile is open
   */
  myProfileAccountOpen?: boolean

  /**
   * Open edit profile dialog
   *
   * @memberof IHomeHeaderComponentProps
   */
  openEditor?: () => void

  /**
   * Image cover address
   *
   * @type {string}
   * @memberof IHomeHeaderComponentProps
   */
  banner?: string

}
