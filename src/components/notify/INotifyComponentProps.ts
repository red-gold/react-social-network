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
  info?: Map<string, any>

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
  
  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any

}
