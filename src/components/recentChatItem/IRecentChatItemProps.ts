import { UserTie } from 'core/domain/circles/userTie'
import {Map} from 'immutable'

export interface IRecentChatItemProps {

  /**
   * Notification description
   */
  description: string

  /**
   * User full name
   */
  fullName: string

  /**
   * User avatar
   */
  avatar: string

  /**
   * Notification has seen {true} or not {false}
   */
  isSeen: boolean

  /**
   * Notification identifier
   */
  id: string

  /**
   * Rediret to {url} route
   */
  goTo?: (url: string) => any

  /**
   * Close a notification
   */
  closeRecentChat?: () => void

  /**
   * Notifier identifier
   */
  followerId: string

  /**
   * The URL which notification mention
   */
  url: string

  /**
   * Change notification status to has seen
   */
  seenRecentChat?: (notificationId: string) => any

  /**
   * Set current chat
   */
  setCurrentChat?: (userId: string) => any

  /**
   * Material ui styles
   */
  classes?: any

  /**
   * Get chat once
   */
  getChatOnce?: (chatRoomId: string) => any

  /**
   * Subscribe to chat
   */
  subscribeChat?: (chatRoomId: string) => any
}
