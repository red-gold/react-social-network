import { Post } from 'src/core/domain/posts'

export interface IStreamComponentState {

  /**
   * Writing post box is open {true} or not false
   *
   * @type {boolean}
   * @memberof IStreamComponentState
   */
  openPostWrite: boolean

  /**
   * Comment on a post is disables {true} or not {false}
   *
   * @type {boolean}
   * @memberof IStreamComponentState
   */
  disableComments: boolean

  /**
   * Sharing post is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IStreamComponentState
   */
  disableSharing: boolean

  /**
   * Post should be in two columns {true} or not false
   *
   * @type {boolean}
   * @memberof IStreamComponentState
   */
  divided: boolean

  /**
   * If there is more post to show
   *
   * @type {boolean}
   * @memberof IStreamComponentState
   */
  hasMorePosts: boolean

  /**
   * The title of top bar
   *
   * @type {string}
   * @memberof IStreamComponentState
   */
  homeTitle: string
}
