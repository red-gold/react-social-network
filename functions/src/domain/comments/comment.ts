import { BaseDomain } from '../common'

export class Comment extends BaseDomain {

    /**
     * Comment identifier
     *
     * @type {string}
     * @memberof Comment
     */
  public id?: string | null

  /**
   * Post identifier that comment belong to
   *
   * @type {string}
   * @memberof Comment
   */
  public postId: string

  /**
   * Comment text
   *
   * @type {string}
   * @memberof Comment
   */
  public text?: string | null

  /**
   * Comment score
   *
   * @type {number}
   * @memberof Comment
   */
  public score?: number | null

  /**
   * Comment creation date
   *
   * @type {number}
   * @memberof Comment
   */
  public creationDate?: number

  /**
   * Comment owner full name
   *
   * @type {string}
   * @memberof Comment
   */
  public userDisplayName?: string

  /**
   * Comment owner avater address
   *
   * @type {string}
   * @memberof Comment
   */
  public userAvatar?: string

  /**
   * Comment owner identifier
   *
   * @type {string}
   * @memberof Comment
   */
  public userId?: string

  /**
   * Comment is in edit state {true} or not {false}
   *
   * @type {boolean}
   * @memberof Comment
   */
  // TODO: Should be changed to reuseable component and remove this property
  editorStatus?: boolean

}
