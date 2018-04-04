import { Post } from 'src/core/domain/posts'
import {Map} from 'immutable'

export interface IStreamComponentProps {

  /**
   * Comment on a post is disables {true} or not {false}
   *
   * @type {boolean}
   * @memberof IStreamComponentState
   */
  disableComments?: boolean

  /**
   * Sharing post is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IStreamComponentState
   */
  disableSharing?: boolean

  /**
   * Post writing input is displayed {true} or not {false}
   *
   * @type {boolean}
   * @memberof IStreamComponentProps
   */
  displayWriting?: boolean

  /**
   * Array of tags in a post
   *
   * @type {string[]}
   * @memberof IStreamComponentProps
   */
  tag?: string[]

  /**
   * The tile of top bar
   *
   * @type {string}
   * @memberof IStreamComponentState
   */
  homeTitle?: string

  /**
   * Set home title
   *
   * @type {Function}
   * @memberof IStreamComponentProps
   */
  setHomeTitle?: () => void

  /**
   * User full name
   *
   * @type {string}
   * @memberof IStreamComponentProps
   */
  fullName?: string

  /**
   * User avatar URL
   *
   * @type {string}
   * @memberof IStreamComponentProps
   */
  avatar?: string

  /**
   * Load the data for stream
   */
  loadStream?: (page: number, limit: number) => any

  /**
   * If there is more post {true} or not {false}
   */
  hasMorePosts?: boolean

  /**
   * Posts for stream
   *
   * @type {{[postId: string]: Post}}
   * @memberof IStreamComponentProps
   */
  posts: Map<string, Map<string, any>>

  /**
   * Router match property
   */
  match?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
