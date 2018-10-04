import { Post } from 'src/core/domain/posts'
import { Map, fromJS, List } from 'immutable'

/**
 * Post state
 *
 * @export
 * @class PostState
 */
export class PostState {

    /**
     * The list of user posts
     */
  userPosts = Map({})

    /**
     * If user posts are loaded {true} or not {false}
     */
  loaded: Boolean = false

  /**
   * Stream data storage
   */
  stream?: Map<string,any> = Map({list: Map({})})

  /**
   * Profile posts data storage
   */
  profile?: Map<string, any> =
  Map({})
}
