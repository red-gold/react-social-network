import { User } from 'core/domain/users'
import {Map} from 'immutable'
import { Message } from 'core/domain/chat/message'
import { ChatRoom } from 'core/domain/chat/chatRoom'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { ChatMessageModel } from 'models/chat/chatMessageModel'

export interface IChatMessageProps {

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Whether is loding state
   */
  loading: boolean

  /**
   * Styles
   */
  classes?: any

  /**
   * Current user
   */
  currentUser: User
  
  /**
   * Whether message direction is right to left
   */
  rtl: boolean

  /**
   * Text message
   */
  text: string

  /**
   * Message owner avatar address
   */
  avatar: string

  /**
   * Message owner name
   */
  ownerName: string
}
