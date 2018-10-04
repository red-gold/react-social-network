import { Post } from 'src/core/domain/posts'
import {Map} from 'immutable'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export interface IPostStreamProps {

  /**
   * Comment on a post is disables {true} or not {false}]
   */
  disableComments?: boolean

  /**
   * Sharing post is disabled {true} or not {false}]
   */
  disableSharing?: boolean

  /**
   * Server request id
   */
  requestId?: string

  /**
   * Post writing input is displayed {true} or not {false}
   */
  displayWriting?: boolean

  /**
   * Array of tags in a post
   */
  tag?: string[]

  /**
   * The tile of top bar
   */
  homeTitle?: string

  /**
   * Set home title
   */
  setHomeTitle?: () => void

  /**
   * Open post write dialog
   */
  openPostWrite?: () => any

  /**
   * Close post write dialog
   */
  closePostWrite?: () => any

  /**
   * Whether post write dialog is open
   */
  postWriteDilogOpen?: boolean

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
