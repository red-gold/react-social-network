import { Post } from 'src/core/domain/posts'

export interface IPostPageComponentProps {

  /**
   * Load the post
   *
   * @memberof IPostPageComponentProps
   */
  loadPost?: () => any

  /**
   * Load user profile
   *
   * @memberof IPostPageComponentProps
   */
  loadUserInfo?: () => any

  /**
   * Route match
   *
   * @type {*}
   * @memberof IPostPageComponentProps
   */
  match?: any

  posts: {[postId: string]: Post}
}
