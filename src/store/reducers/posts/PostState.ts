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
     *
     * @type {*}
     * @memberof PostState
     */
  userPosts = Map({})

    /**
     * If user posts are loaded {true} or not {false}
     *
     * @type {Boolean}
     * @memberof PostState
     */
  loaded: Boolean = false

  /**
   * Stream data storage
   */
  stream?: Map<string,any> =
  Map({hasMoreData: true, lastPageRequest: -1, lastPostId: ''})

  /**
   * Profile posts data storage
   */
  profile?: Map<string, any> =
  Map({})
}
