import { Notification } from 'core/domain/notifications'
import {Map} from 'immutable'
import { UserTie } from 'core/domain/circles/userTie'
export interface IRecentChatProps {

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

  /**
   * User followers info
   */
  followers?: Map<string, Map<string, any>>

}
