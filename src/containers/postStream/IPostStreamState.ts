import { Post } from 'src/core/domain/posts'
import {Map} from 'immutable'

export interface IPostStreamState {

  /**
   * Writing post box is open {true} or not false
   */
  openPostWrite: boolean

  /**
   * Comment on a post is disables {true} or not {false}
   */
  disableComments: boolean

  /**
   * Sharing post is disabled {true} or not {false}
   */
  disableSharing: boolean

  /**
   * Post should be in two columns {true} or not false
   */
  divided: boolean

  /**
   * If there is more post to show
   */
  hasMorePosts: boolean

  /**
   * The title of top bar
   */
  homeTitle: string

  /**
   * Posts for stream
   */
  posts: Array<Post[]>

  /**
   * Posts for stream
   */
  prevPosts: Map<string, Map<string, any>>
}
