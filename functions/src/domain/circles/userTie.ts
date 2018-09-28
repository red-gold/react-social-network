import { BaseDomain } from '../common/baseDomain'

export class UserTie extends BaseDomain {

  constructor (
  /**
   * User identifier
   */
  public userId?: string,

    /**
     * Circle creation date time
     */
  public creationDate?: number,

    /**
     * User full name
     */
  public fullName?: string,

    /**
     * Avatar URL address
     */
  public avatar?: string,

    /**
     * If following user approved {true} or not {false}
     */
  public approved?: Boolean,

  /**
   * List of circles identifire which this user belong to
   */
  public circleIdList?: string[]

  ) {
    super()
  }

}
