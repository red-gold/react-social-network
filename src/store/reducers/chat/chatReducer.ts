// - Import react components
import { ChatActionType } from 'constants/chatActionType';
import { Map } from 'immutable';

import { IChatAction } from './IChatAction';

// - Import action types
// Import domain

const setCurrentChat = (state: any, payload: any) => {
  const {  chatRoom } = payload
  return state.setIn(['currentChat', 'chatRoom'], chatRoom)
  .set('chatOpen', true)
}

/**
 * Chat actions
 */
export let chatReducer = (state = Map({chatOpen: false, recentChatOpen: false }), action: IChatAction) => {
  let { payload } = action
  switch (action.type) {

    case ChatActionType.ADD_CHAT_ROOM_MESSAGES:
      const { messages, chatRoomId } = payload
      return state.mergeIn(['messages', chatRoomId], messages)

    case ChatActionType.REMOVE_CHAT_HISTORY:
      const { roomId } = payload
      return state.removeIn(['messages', roomId])

    case ChatActionType.OPEN_CHAT:
      return state.set('chatOpen', true)

    case ChatActionType.CLOSE_CHAT:
      return state.set('chatOpen', false)

    case ChatActionType.OPEN_RECENT_CHAT:
      return state.set('recentChatOpen', true)

    case ChatActionType.CLOSE_RECENT_CHAT:
      return state.set('recentChatOpen', false)

    case ChatActionType.SET_CURRENT_CHAT: return setCurrentChat(state,payload)

    case ChatActionType.CLEAR_ALL_CHAT_MESSAGE:
      return Map({})

    default:
      return state
  }
}
