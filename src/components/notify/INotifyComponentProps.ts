import { Profile } from 'core/domain/users'
import { Notification } from 'core/domain/notifications'
import {Map} from 'immutable'
export interface INotifyComponentProps {

  /**
   * Notifications
   */
  notifications?: Map<string, any>

  /**
   * Users' profile
   */
  info?: Map<string, Profile>

  /**
   * Close notification
   */
  onRequestClose: () => void

  /**
   * User notifications popover is opem {true} or not {false}
   */
  open: boolean

  /**
   * Keep element
   */
  anchorEl?: any

  /**
   * Material ui styles
   */
  classes?: any

}
