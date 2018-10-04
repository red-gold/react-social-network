import { BaseDomain } from 'core/domain/common'
import { User } from 'core/domain/users'
import { NotificationType } from 'core/domain/notifications/notificationType'

export class Notification extends BaseDomain {

  /**
   * Notification identifier
   */
  public id?: string

    /**
     * Description of notification
     */
  public description: string

    /**
     * The URL which notification refer to
     */
  public url: string

  /**
   * Creation date
   */
  public creationDate: number
    /**
     * The identifier of the user who makes the notification
     */
  public notifierUserId: string

  /**
   * Notifier profile
   */
  public notifierProfile?: User
    /**
     * The identifier of the user who receive the notification
     */
  public notifyRecieverUserId: string

    /**
     * If the notification is seen {true} or not {false}
     */
  public isSeen: boolean

  /**
   * Notification type
   */
  public type: NotificationType

  /**
   * Whether should notify by email
   */
  public emailNotification: boolean = false

}
