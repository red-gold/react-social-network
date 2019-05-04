import { ChatActionType } from 'constants/chatActionType';
import { Message } from 'core/domain/chat/message';
import { Map } from 'immutable';

// - Import action types
// - Import domain

// - Import actions

/**
 * Fetch chat message subscribe
 */
export const dbSubscribeChatMessage = (chatRoomId: string) => {
  return { 
    type: ChatActionType.DB_SUBSCRIBE_CHAT_MESSAGE,
    payload: {
      chatRoomId
    }
  }
}

/**
 * Fetch chat message
 */
export const dbFetchChatMessageOnce = (chatRoomId: string) => {
  return { 
    type: ChatActionType.DB_FETCH_CHAT_MESSAGE_ONCE,
    payload: {
      chatRoomId
    }
  }
}

/**
 * Create chat message on server
 */
export const dbCreateChatMessage = (message: Message) => {
  return { 
    type: ChatActionType.DB_CREATE_CHAT_MESSAGE,
    payload: message    
  }

}

/**
 * Set chat language on server
 */
export const dbSetChatLanguage = (input: string, output: string, roomId: string) => {
  return { 
    type: ChatActionType.DB_SET_CHAT_LANGUAGE,
    payload: {input, output, roomId}    
  }

}

/**
 * Create chat room on server
 */
export const dbCreateChatRoom = (message: Message) => {
  return { 
    type: ChatActionType.DB_CREATE_CHAT_ROOM,
    payload: message    
  }

}

/**
 * Fetch peer chatroom
 */
export const dbFetchPeerChatRoom = (chatRoomId: string) => {
  return { 
    type: ChatActionType.DB_FETCH_PEER_CHAT_ROOMS,
    payload: {
      chatRoomId
    }
  }
}

/**
 * Add chat messages
 */
export const addChatRoomMessages = (messages: Map<string, any>, chatRoomId: string) => {
  return { 
    type: ChatActionType.ADD_CHAT_ROOM_MESSAGES, payload: {messages, chatRoomId}
  }
}

/**
 * Active peer chat room
 */
export const activePeerChatRoom = (receiverId: string) => {
  return { 
    type: ChatActionType.ACTIVE_PEER_CHAT_ROOM, payload: {receiverId}
  }
}

/**
 * Set current chat information
 */
export const setCurrentChat = (chatRoom: Map<string,any>) => {
  return { 
    type: ChatActionType.SET_CURRENT_CHAT, payload: {chatRoom}
  }
}

/**
 * Close chat window
 */
export const closeChat = () => {
  return { 
    type: ChatActionType.CLOSE_CHAT
  }
}

/**
 * Open chat window
 */
export const openChat = () => {
  return { 
    type: ChatActionType.OPEN_CHAT
  }
}

/**
 * Close recent chat window
 */
export const closeRecentChat = () => {
  return { 
    type: ChatActionType.CLOSE_RECENT_CHAT
  }
}

/**
 * Open recent chat window
 */
export const openRecentChat = () => {
  return { 
    type: ChatActionType.OPEN_RECENT_CHAT
  }
}

/**
 * Remove chat history
 */
export const removeChatHistory = (roomId: string) => {
  return { type: ChatActionType.REMOVE_CHAT_HISTORY, payload: {roomId} }
}

/**
 * Remove chat history on server
 */
export const dbRemoveChatHistory = (roomId: string) => {
  return { type: ChatActionType.DB_REMOVE_CHAT_HISTORY, payload: {roomId}  }
}

/**
 * Clear all data
 */
export const clearAllChat = () => {
  return { type: ChatActionType.CLEAR_ALL_CHAT_MESSAGE }
}
