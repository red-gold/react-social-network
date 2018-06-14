import { Post } from 'src/core/domain/posts'

export interface IProfileComponentProps {

  /**
   * Router match
   *
   * @type {*}
   * @memberof IProfileComponentProps
   */
  match: any

  /**
   * User's post
   *
   * @type {{[postId: string]: Post}}
   * @memberof IProfileComponentProps
   */
  posts: {[postId: string]: Post}

  /**
   * String user full name
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  name: string

  /**
   * User tag line
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  tagLine: string

  /**
   * User's avatar address
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  avatar: string

  /**
   * It's current user profile {true} or not {false}
   *
   * @type {boolean}
   * @memberof IProfileComponentProps
   */
  isAuthedUser: boolean

  /**
   * User's banner
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  banner: string

  /**
   * User identifier
   *
   * @type {string}
   * @memberof IProfileComponentProps
   */
  userId: string

  /**
   * Load user's post
   *
   * @memberof IProfileComponentProps
   */
  loadPosts: () => any

  /**
   * Load user's profile
   *
   * @memberof IProfileComponentProps
   */
  loadUserInfo: () => any

  /**
   * If there is more posts to show in profile
   */
  hasMorePosts: boolean

  /**
   * Translate to locale string
   */
  translate?: (state: any, params?: {}) => any
}
