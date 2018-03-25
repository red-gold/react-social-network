import { Post } from 'src/core/domain/posts'

export interface IHomeComponentProps {

  /**
   * Current user is authenticated {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeComponentProps
   */
  authed?: boolean

  /**
   * If user email is verifide {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeComponentProps
   */
  isVerifide?: boolean

  /**
   * User identifier
   *
   * @type {string}
   * @memberof IHomeComponentProps
   */
  uid?: string

  /**
   * Merged all users posts to show in stream
   *
   * @type {{[postId: string]: Post}}
   * @memberof IHomeComponentProps
   */
  mergedPosts?: {[postId: string]: Post}

  /**
   * Load the data for stream
   */
  loadDataStream?: (lastPostId: string, page: number, limit: number) => any

  /**
   * Global state
   *
   * @type {*}
   * @memberof IMasterProps
   */
  global?: any

  /**
   * Clear user date from store
   *
   * @type {Function}
   * @memberof IMasterProps
   */
  clearData?: Function

    /**
     * Set flag {true} which all user data has loaded
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  defaultDataEnable?: Function
    /**
     * Load user data into store
     *
     * @type {Function}
     * @memberof IMasterProps
     */
  loadData?: Function

    /**
     * Set flag {false} which user data has not loaded
     *
     * @type {Function}
     * @memberof IMasterProps
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
   *
   * @type {boolean}
   * @memberof IHomeComponentProps
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
  translate?: (state: any) => any

  /**
   * Styles
   */
  classes?: any
  
  /**
   * Theme
   */
  theme?: any

}
