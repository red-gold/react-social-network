import { User } from 'core/domain/users'
import { Circle } from 'core/domain/circles/circle'
import { UserTie } from 'core/domain/circles'

export interface IUserBoxComponentProps {

    /**
     * User identifier
     *
     * @type {string}
     * @memberof IUserBoxComponentProps
     */
  userId: string

  /**
   * User
   *
   * @type {User}
   * @memberof IUserBoxComponentProps
   */
  user: UserTie

    /**
     * Circles
     *
     * @type {{[circleId: string]: Circle}}
     * @memberof IUserBoxComponentProps
     */
  circles?: {[circleId: string]: Circle}

    /**
     * List of circles' id
     *
     * @type {string[]}
     * @memberof IUserBoxComponentProps
     */
  userBelongCircles?: string[]

  /**
   * Whether current user followed this user
   */
  isFollowed: boolean

    /**
     * The number of circles
     *
     * @type {number}
     * @memberof IUserBoxComponentProps
     */
  belongCirclesCount?: number

    /**
     * The first circle
     *
     * @type {User}
     * @memberof IUserBoxComponentProps
     */
  firstBelongCircle?: Circle

    /**
     * Avatar address
     *
     * @type {string}
     * @memberof IUserBoxComponentProps
     */
  avatar?: string

   /**
    * User full name
    *
    * @type {string}
    * @memberof IUserBoxComponentProps
    */
  fullName?: string

  /**
   * Create a circle
   *
   * @memberof IUserBoxComponentProps
   */
  createCircle?: (name: string) => any

  /**
   * Add a user in a circle
   *
   * @memberof IUserBoxComponentProps
   */
  addFollowingUser?: (cid: string,user: UserTie) => any

  /**
   * Delete
   *
   * @memberof IUserBoxComponentProps
   */
  deleteFollowingUser?: (cid: string ,followingId: string) => any

  /**
   * Redirect page to [url]
   *
   * @memberof IUserBoxComponentProps
   */
  goTo?: (url: string) => any
}
