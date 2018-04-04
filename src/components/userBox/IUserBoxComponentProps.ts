import { User } from 'core/domain/users'
import { Circle } from 'core/domain/circles/circle'
import { UserTie } from 'core/domain/circles'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server/serverRequestModel'
import {Map, List} from 'immutable'
export interface IUserBoxComponentProps {

    /**
     * User identifier
     */
  userId: string

  /**
   * User
   */
  user: UserTie

    /**
     * Circles
     */
  circles?: Map<string, Map<string, any>>

    /**
     * List of circles' id
     */
  userBelongCircles?: List<string>

  /**
   * Whether current user followed this user
   */
  isFollowed?: boolean

    /**
     * The number of circles
     */
  belongCirclesCount?: number

    /**
     * The first circle
     */
  firstBelongCircle?: Map<string, any>

    /**
     * Avatar address
     */
  avatar?: string

   /**
    * User full name
    */
  fullName?: string

   /**
    * The `Following` circle identifier of current user
    */
  followingCircle?: Map<string, any>

  /**
   * Create a circle
   */
  createCircle?: (name: string) => any

  /**
   * Add a user in a circle
   */
  addUserToCircle?: (circleIds: List<string>,user: UserTie) => any

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
  setSelectedCircles?: (userId: string, circleList: List<string>) => any

  /**
   * Remove current user selected circles for referer user
   */
  removeSelectedCircles?: (userId: string, circleList: List<string>) => any

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
  selectedCircles?: List<string>

  /**
   * Whether the select circles box for referer user is open
   */
  isSelecteCirclesOpen?: boolean

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any
}
