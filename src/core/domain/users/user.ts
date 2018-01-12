import { BaseDomain } from 'core/domain/common'

export class User extends BaseDomain {

    /**
     * Full name of user
     *
     * @type {string}
     * @memberof User
     */
  public fullName: string

    /**
     * User avatar address
     *
     * @type {string}
     * @memberof User
     */
  public avatar: string

    /**
     * Email of the user
     *
     * @type {string}
     * @memberof User
     */
  public email?: string | null

    /**
     * Password of the user
     *
     * @type {string}
     * @memberof User
     */
  public password?: string | null

    /**
     * User identifier
     *
     * @type {string}
     * @memberof User
     */
  public userId?: string | null

    /**
     * User creation date
     *
     * @type {number}
     * @memberof User
     */
  public creationDate: number

}
