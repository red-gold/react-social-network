import { User } from 'core/domain/users'
import {Map} from 'immutable'
import { Message } from 'core/domain/chat/message'
import { ChatRoom } from 'core/domain/chat/chatRoom'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { ChatMessageModel } from 'models/chat/chatMessageModel'

export interface IChatProps {

  /**
   * Whether window chat is open
   */
  open: boolean

  /**
   * On toggle open/close chat window
   */
  onToggle: () => void

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Whether recent chat is open
   */
  recentChatOpen?: boolean

  /**
   * Open recent chat
   */
  openRecentChat?: () => any

  /**
   * Close recent chat
   */
  closeRecentChat?: () => any

  /**
   * Receiver user info
   */
  receiverUser?: User

  /**
   * Remove chat history
   */
  removeChatHistory?: (roomId: string) => any

  /**
   * Set current chat
   */
  setCurrentChat?: (userId: string) => any

  /**
   * Followers
   */
  followers?: Map<string, any>

  /**
   * Chat messages
   */
  chatMessages?: ChatMessageModel[]

  /**
   * Styles
   */
  classes?: any

  /**
   * Current user
   */
  currentUser?: User

  /**
   * Send message
   */
  sendMessage?: (message: Message) => any

  /**
   * Window width
   */
  width?: Breakpoint

  /**
   * Current chat room
   */
  currentChatRoom?: ChatRoom
}
