import { BaseDomain } from 'core/domain/common'

export class Circle extends BaseDomain {

    /**
     * Circle identifier
     *
     * @type {string}
     * @memberof User
     */
  public id?: string | null

    /**
     * Circle creation date time
     *
     * @type {Date}
     * @memberof Circle
     */
  public creationDate?: number

    /**
     * Circle owner identifier
     *
     * @type {string}
     * @memberof Circle
     */
  public ownerId?: string | null

    /**
     * Circle name
     *
     * @type {string}
     * @memberof User
     */
  public name: string

  /**
   * Whether it's configured by system
   */
  public isSystem: boolean

}
