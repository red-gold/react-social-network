import { Post } from 'src/core/domain/posts'
import {Map} from 'immutable'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { User } from 'core/domain/users'

export interface IStreamComponentProps {

  /**
   * The tile of top bar
   */
  homeTitle?: string

  /**
   * Set home title
   */
  setHomeTitle?: (homeTitle: string) => void

  /**
   * User full name
   */
  fullName?: string

  /**
   * User avatar URL
   */
  avatar?: string

  /**
   * Load the data for stream
   */
  loadStream?: (page: number) => any

  /**
   * If there is more post {true} or not {false}
   */
  hasMorePosts?: boolean

  /**
   * Posts for stream
   */
  posts: Map<string, Map<string, any>>

  /**
   * Stream request id
   */
  requestId?: string

  /**
   * Router match property
   */
  match?: any

  streamRequestStatus?: ServerRequestStatusType

  /**
   * Current user
   */
  currentUser?: User

  /**
   * Current page number
   */
  page?: number

  /**
   * Translate to locale string
   */
  increasePage?: () => any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Styles
   */
  classes?: any
}
