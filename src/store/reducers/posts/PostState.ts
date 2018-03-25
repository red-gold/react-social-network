import { Post } from 'src/core/domain/posts'

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
  userPosts: any = {}

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
  stream?: {hasMoreData: boolean, lastPageRequest: number, lastPostId: string} =
  {hasMoreData: true, lastPageRequest: -1, lastPostId: ''}

  /**
   * Profile posts data storage
   */
  profile?: {[userId: string]: {hasMoreData: boolean, lastPageRequest: number, lastPostId: string}} =
  {}
}
