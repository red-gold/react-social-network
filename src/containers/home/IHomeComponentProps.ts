import { Post } from 'src/core/domain/posts'

export interface IHomeComponentProps {

  /**
   * Current user is authenticated {true} or not {false}
   */
  authed?: boolean

  /**
   * If user email is verifide {true} or not {false}
   */
  isVerifide?: boolean

  /**
   * User identifier
   */
  uid?: string

  /**
   * Whether chat is open
   */
  isChatOpen?: boolean

  /**
   * Merged all users posts to show in stream
   */
  mergedPosts?: {[postId: string]: Post}

  /**
   * Load the data for stream
   */
  loadDataStream?: (lastPostId: string, page: number, limit: number) => any

  /**
   * Global state
   */
  global?: any

  /**
   * Clear user date from store
   */
  clearData?: Function

    /**
     * Set flag {true} which all user data has loaded
     */
  defaultDataEnable?: Function
    /**
     * Load user data into store
     */
  loadData?: Function

    /**
     * Set flag {false} which user data has not loaded
     */
  defaultDataDisable?: Function

  /**
   * Redirect to [url]
   *
   * @memberof IHomeComponentProps
   */
  goTo?: (url: string) => any

  /**
   * If there is more post {true} or not {false}
   */
  hasMorePosts?: boolean

  /**
   * If all requierment data loaded {true} or not {false}
   */
  loaded?: boolean

  /**
   * Show send feedback form
   */
  showSendFeedback?: () => any

  /**
   * Hide send feedback form
   */
  hideSendFeedback?: () => any

  /**
   * Translate locale to string
   */
  t?: (state: any) => any

  /**
   * Open chat
   */
  openChat?: () => any

  /**
   * Close chat
   */
  closeChat?: () => any

  /**
   * Styles
   */
  classes?: any
  
  /**
   * Theme
   */
  theme?: any

}
