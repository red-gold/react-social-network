import { BaseDomain } from 'core/domain/common'
import { Comment } from 'core/domain/comments'
export class Post extends BaseDomain {

    /**
     * Post identifier
     *
     * @type {string}
     * @memberof Post
     */
  public id?: string | null

    /**
     * The identifier of post type
     *
     * @type {number}
     * @memberof Post
     */
  public postTypeId?: number

    /**
     * The post creation date
     *
     * @type {number}
     * @memberof Post
     */
  public creationDate?: number

    /**
     * The post delete date
     *
     * @type {number}
     * @memberof Post
     */
  public deleteDate?: number

    /**
     * The score of post
     *
     * @type {number}
     * @memberof Post
     */
  public score?: number

  /**
   * List of voter identifier
   *
   * @type {{[voterId: string]: boolean}}
   * @memberof Post
   */
  votes?: {[voterId: string]: boolean}

    /**
     * Post view count
     *
     * @type {number}
     * @memberof Post
     */
  public viewCount?: number

  /**
   * Store three last comments to show in slide preview comment
   *
   * @type {{[commentId: string]: Comment}}
   * @memberof Post
   */
  comments?: {[commentId: string]: Comment}

    /**
     * The text of post
     *
     * @type {string}
     * @memberof Post
     */
  public body?: string

    /**
     * The identifier of post owner
     *
     * @type {string}
     * @memberof Post
     */
  public ownerUserId?: string

    /**
     * Full name of post owner
     *
     * @type {string}
     * @memberof Post
     */
  public ownerDisplayName?: string

    /**
     * Avatar address of post owner
     *
     * @type {string}
     * @memberof Post
     */
  public ownerAvatar?: string

    /**
     * Last post edit date
     *
     * @type {number}
     * @memberof Post
     */
  public lastEditDate?: number

    /**
     * Post tags
     *
     * @type {string[]}
     * @memberof Post
     */
  public tags?: string[]

    /**
     * Numeber of comment on the post
     *
     * @type {number}
     * @memberof Post
     */
  public commentCounter?: number

    /**
     * The address of image on the post
     *
     * @type {string}
     * @memberof Post
     */
  public image?: string

    /**
     * Post image full path
     *
     * @type {string}
     * @memberof Post
     */
  public imageFullPath?: string

    /**
     * The adress of video on the post
     *
     * @type {string}
     * @memberof Post
     */
  public video?: string

    /**
     * If writing comment is disabled {true} or not {false}
     *
     * @type {Boolean}
     * @memberof Post
     */
  public disableComments?: boolean

    /**
     * If sharing post is disabled {true} or not {false}
     *
     * @type {Boolean}
     * @memberof Post
     */
  public disableSharing?: boolean

    /**
     * If the post is deleted {true} or not false
     *
     * @type {Boolean}
     * @memberof Post
     */
  public deleted?: boolean

}
