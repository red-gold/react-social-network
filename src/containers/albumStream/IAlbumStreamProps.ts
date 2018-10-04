import { Post } from 'src/core/domain/posts'
import {Map, List} from 'immutable'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { User } from 'core/domain/users'

export interface IAlbumStreamProps {

  /**
   * Server request id
   */
  requestId?: string

  /**
   * The tile of top bar
   */
  homeTitle?: string

  /**
   * Set home title
   */
  setHomeTitle?: () => void

  /**
   * Current authed user
   */
  currentUser?: User

  /**
   * Profile owner id
   */
  userId?: string

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
   * Go to {url}
   */
  goTo?: (url: string) => any

  /**
   * If there is more post {true} or not {false}
   */
  hasMoreAlbum?: boolean

  /**
   * Posts for stream
   */
  posts: List<Map<string, any>>

  /**
   * Router match property
   */
  match?: any

  streamRequestStatus?: ServerRequestStatusType

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Styles
   */
  classes?: any
}
