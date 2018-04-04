import { Comment } from 'core/domain/comments'
import { Post } from 'core/domain/posts/post'
import {Map} from 'immutable'
export interface IPostComponentProps {

  /**
   * Post object
   */
  post: Map<string, any>

  /**
   * Owner's post avatar
   *
   * @type {string}
   * @memberof IPostComponentProps
   */
  avatar?: string

  /**
   * User full name
   *
   * @type {string}
   * @memberof IPostComponentProps
   */
  fullName?: string

  /**
   * Number of vote on a post
   *
   * @type {number}
   * @memberof IPostComponentProps
   */
  voteCount?: number

  /**
   * Current user vote the post {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPostComponentProps
   */
  currentUserVote?: boolean

  /**
   * Current user is the owner of the post {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPostComponentProps
   */
  isPostOwner?: boolean

  /**
   * Vote a post
   *
   * @memberof IPostComponentProps
   */
  vote?: () => any

  /**
   * Delete a vote on the post
   *
   * @memberof IPostComponentProps
   */
  unvote?: () => any

  /**
   * Delte a post
   *
   * @memberof IPostComponentProps
   */
  delete?: (id: string) => any

  /**
   * Toggle comment disable/enable
   *
   * @memberof IPostComponentProps
   */
  toggleDisableComments?: (status: boolean) => any

  /**
   * Toggle sharing disable/enable
   *
   * @memberof IPostComponentProps
   */
  toggleSharingComments?: (status: boolean) => any

  /**
   * Redirect to {url} route
   *
   * @memberof IPostComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Set tile of top bar
   *
   * @memberof IPostComponentProps
   */
  setHomeTitle?: (title: string) => any

  /**
   * Get the comments of a post
   *
   * @memberof IPostComponentProps
   */
  getPostComments?: (ownerUserId: string, postId: string) => any

  /**
   * Commnets
   *
   * @type {{[commentId: string]: Comment}}
   * @memberof ICommentGroupComponentProps
   */
  commentList?: Map<string, Comment>

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
