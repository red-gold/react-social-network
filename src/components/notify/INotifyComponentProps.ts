import { Profile } from 'core/domain/users'
import { Notification } from 'core/domain/notifications'

export interface INotifyComponentProps {

  /**
   * Notifications
   *
   * @type {{[notificationId: string]: Notification}}
   * @memberof INotifyComponentProps
   */
  notifications?: {[notificationId: string]: Notification}

  /**
   * Users' profile
   *
   * @type {{[userId: string]: Profile}}
   * @memberof INotifyComponentProps
   */
  info?: {[userId: string]: Profile}

  /**
   * Close notification
   *
   * @memberof INotifyComponentProps
   */
  onRequestClose: () => void

  /**
   * User notifications popover is opem {true} or not {false}
   *
   * @type {boolean}
   * @memberof INotifyComponentProps
   */
  open: boolean

  /**
   * Keep element
   *
   * @type {*}
   * @memberof INotifyComponentProps
   */
  anchorEl: any

}
