import { User } from 'core/domain/users'
import {Map} from 'immutable'
import { Message } from 'core/domain/chat/message'
import { ChatRoom } from 'core/domain/chat/chatRoom'
import { ChatMessageModel } from 'models/chat/chatMessageModel'

export interface IChatBodyProps {

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Chat messages
   */
  chatMessages: ChatMessageModel[]

  /**
   * Styles
   */
  classes?: any

  /**
   * Current user
   */
  currentUser: User
}
