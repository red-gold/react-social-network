import { Post } from 'src/core/domain/posts'
import { User } from 'core/domain/users'
import {Map} from 'immutable'

export interface IProfileComponentProps {

  /**
   * Router match
   */
  match: any

  /**
   * User's post
   */
  posts: Map<string, any>

  /**
   * User profile
   */
  profile?: User

  /**
   * String user full name
   */
  name: string

  /**
   * User tag line
   */
  tagLine: string

  /**
   * User's avatar address
   */
  avatar: string

  /**
   * It's current user profile {true} or not {false}
   */
  isCurrentUser: boolean

  /**
   * User's banner
   */
  banner: string

  /**
   * User identifier
   */
  userId: string

  /**
   * Load user's post
   */
  loadPosts: (page: number) => any

  /**
   * Load user's profile
   */
  loadUserInfo: () => any

  /**
   * If there is more posts to show in profile
   */
  hasMorePosts: boolean

  /**
   * Post server request identifier
   */
  postRequestId?: string

  /**
   * Translate to locale string
   */
  t?: (state: any, params?: {}) => any

  /**
   * Styles
   */
  classes?: any
}
