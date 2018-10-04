import { Message } from 'core/domain/chat/message'
import { Map } from 'immutable'
import { ChatRoom } from 'core/domain/chat/chatRoom'
import { CallEffect } from 'redux-saga/effects'

/**
 * Chat interface
 */
export interface IChatService {

  /**
   * Create chat room
   */
  createChatRoom: (chatRoom: ChatRoom)
  => Promise<Map<string, any>>

  /**
   * Get chat room
   */
  getPeerChatRoom: (firstUserId: string, secondUserId: string)
  => Promise<Map<string, any>>

  /**
   * Create chat message
   */
  createChatMessage: (message: Message)
    => Promise<Map<string, any>>

  /**
   * Set chat room language
   */
  setChatLangauge: (uid: string, input: string, output: string, roomId: string)
  => Promise<void> 
  /**
   * Get chat message
   */
  subscribeChatMessages: (chatRoomId: string,
    callback: (messages: Map<string, any>) => void)
    => any

  /**
   * Get chat message
   */
  getChatMessages: (chatRoomId: string)
  => Promise<Map<string, any>>

  /**
   * Remove chat room message history
   */
  removeHistoryRoom: (chatRoomId: string)
    => any

}
