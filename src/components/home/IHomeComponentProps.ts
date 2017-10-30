import { Post } from 'core/domain/posts'

export interface IHomeComponentProps {

  /**
   * Current user is authenticated {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeComponentProps
   */
  authed?: boolean

  /**
   * User identifier
   *
   * @type {string}
   * @memberof IHomeComponentProps
   */
  uid: string

  /**
   * Merged all users posts to show in stream
   *
   * @type {{[postId: string]: Post}}
   * @memberof IHomeComponentProps
   */
  mergedPosts?: {[postId: string]: Post}
}
