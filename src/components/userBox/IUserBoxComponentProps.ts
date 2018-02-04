import { User } from 'core/domain/users'
import { Circle } from 'core/domain/circles/circle'
import { UserTie } from 'core/domain/circles'
import { ServerRequestStatusType } from 'actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server/serverRequestModel'

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
  isFollowed?: boolean

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
    * The `Following` circle identifier of current user
    */
  followingCircleId?: string

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
  addUserToCircle?: (circleIds: string[],user: UserTie) => any

  /**
   * Add referer user to the `Following` circle of current user
   */
  followUser?: (circleId: string, userFollowing: UserTie) => any

  /**
   * Delete following user
   */
  deleteFollowingUser?: (followingId: string) => any

  /**
   * Set current user selected circles for referer user
   */
  setSelectedCircles?: (userId: string, circleList: string[]) => any

  /**
   * Remove current user selected circles for referer user
   */
  removeSelectedCircles?: (userId: string, circleList: string[]) => any

  /**
   * Open select circle box
   */
  openSelectCircles?: (userId: string) => any

  /**
   * Close select circle box
   */
  closeSelectCircles?: (userId: string) => any

  /**
   * Redirect page to [url]
   *
   * @memberof IUserBoxComponentProps
   */
  goTo?: (url: string) => any

  /**
   * The status of following user server request
   */
  followRequest?: ServerRequestModel

  /**
   * The status of add to circle user server request
   */
  addToCircleRequest?: ServerRequestModel

  /**
   * The status of deleting following user server request
   */
  deleteFollowingUserRequest?: ServerRequestModel

  /**
   * Keep selected circles for refere user
   */
  selectedCircles?: string[]

  /**
   * Whether the select circles box for referer user is open
   */
  isSelecteCirclesOpen?: boolean

  /**
   * Styles
   */
  classes?: any
}
