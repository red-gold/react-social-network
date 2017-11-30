import { BaseDomain } from 'core/domain/common'

export class Notification extends BaseDomain {

  /**
   * Notification identifier
   *
   * @type {string}
   * @memberof Notification
   */
  public id?: string

    /**
     * Description of notification
     *
     * @type {string}
     * @memberof Notification
     */
  public description: string

    /**
     * The URL which notification refer to
     *
     * @type {string}
     * @memberof Notification
     */
  public url: string

    /**
     * The identifier of the user who makes the notification
     *
     * @type {string}
     * @memberof Notification
     */
  public notifierUserId: string

    /**
     * The identifier of the user who receive the notification
     *
     * @type {string}
     * @memberof Notification
     */
  public notifyRecieverUserId: string

    /**
     * If the notification is seen {true} or not {false}
     *
     * @type {Boolean}
     * @memberof Notification
     */
  public isSeen: boolean

}
