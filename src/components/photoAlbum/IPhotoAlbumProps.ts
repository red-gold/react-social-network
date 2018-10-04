import { Post } from 'src/core/domain/posts'
import { User } from 'core/domain/users'
import {Map} from 'immutable'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export interface IPhotoAlbumProps {

  /**
   * Router match
   */
  match: any
 
  /**
   * Search posts
   */
  search: (query: string, page: number, limit: number) => any
  
  /**
   * Theme
   */
  history?: any
  
  /**
   * Router match
   */
  location: any

  /**
   * Stream request id
   */
  requestId?: string

  /**
   * The tile of top bar
   */
  homeTitle?: string

  /**
   * Search request status
   */
  searchRequestStatus?: ServerRequestStatusType

  /**
   * Current user
   */
  currentUser?: User

  /**
   * Load the data for stream
   */
  loadPosts?: (page: number) => any

  /**
   * If there is more post {true} or not {false}
   */
  hasMorePosts?: boolean

  /**
   * Posts for stream
   */
  posts: Map<string, Map<string, any>>

  /**
   * Translate to locale string
   */
  t?: (state: any, params?: {}) => any

  /**
   * Styles
   */
  classes?: any
}
