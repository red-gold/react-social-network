import { take, fork, select, put, call, cancelled, all,takeEvery, takeLatest } from 'redux-saga/effects'
import * as chatActions from 'store/actions/chatActions'
import * as globalActions from 'store/actions/globalActions'
import {ChatActionType} from 'constants/chatActionType'
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { IChatService } from 'core/services/chat'
import { provider } from 'socialEngine'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import {Map} from 'immutable'
import { eventChannel, Channel } from 'redux-saga'
import { Message } from 'core/domain/chat/message'
import { ChatRoom } from 'core/domain/chat/chatRoom'
import { ChatRoomType } from 'core/domain/chat/ChatRoomType'
import { chatSelector } from 'store/reducers/chat/chatSelector'

/**
 * Get service providers
 */
const chatService: IChatService = provider.get<IChatService>(SocialProviderTypes.ChatService)

/***************************** Subroutines ************************************/
/**
 * Creating channel event and subscribing chat service
 */
function subscribeChatMessage(chatRoomId: string) {  
  return eventChannel<Map<string, any>>((emmiter) => {
      const unsubscribe = chatService.subscribeChatMessages(chatRoomId, 
        (messages: Map<string, any> ) => {
           emmiter(messages)
       })
       return () => {
           unsubscribe()
       }
   })
}

/**
 * On database fetch
 */
function* dbFetchChatMessages(chatRoomId: string) {
   const channelSubscription: Channel<Map<string, any>> =  yield call(subscribeChatMessage, chatRoomId)
   try {    
       while (true) {
          let messages: Map<string, any> = yield take(channelSubscription)
          
          if (messages) {
            yield put(chatActions.addChatRoomMessages(messages, chatRoomId))
          }
      }
    } finally {
      if (yield cancelled()) {
          channelSubscription.close()
        } 
    }
  
}

/**
 * Fetch chat messages once
 */
function* dbFetchChatMessageOnce(chatRoomId: string) {

    try {
      const messages = yield call(chatService.getChatMessages, chatRoomId )
      if (messages) {
        yield put(chatActions.addChatRoomMessages(messages, chatRoomId))
      }
    } catch (error) {
      yield put(globalActions.showMessage(error.message))
    }
}

/**
 * Create chat message
 */
function* dbCreateChatMessage(action: { type: ChatActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    const { payload } = action
    try {
      yield fork(chatService.createChatMessage, payload )
      yield put(chatActions.addChatRoomMessages(Map({[payload.id]: Map({...payload, loading: true})}), payload.chatRoomId) )

    } catch (error) {
      yield put(globalActions.showMessage('chatSaga/dbCreateChatMessage : ' + error.message))
    }
  }
}

/**
 * Create chat room
 */
function* dbCreateChatRoom(chatRoom: ChatRoom) {
    try {
      yield call(chatService.createChatRoom, chatRoom )
    } catch (error) {
      yield put(globalActions.showMessage('chatSaga/dbCreateChatRoom : ' + error.message))
    }
}

/**
 * Get peer chatroom
 */
function* dbGetPeerChatRoom(firstUserId: string, secondUserId: string) {
    try {
        yield call(chatService.getPeerChatRoom, firstUserId, secondUserId )
    } catch (error) {
      yield put(globalActions.showMessage('chatSaga/dbGetPeerChatRoom : ' + error.message))

    }
}

/**
 * Set chat room  language
 */
function* setChatLanguage(uid: string, input: string, output: string, roomId: string) {
    try {
       yield call(chatService.setChatLangauge, uid, input,output, roomId)
       let room: Map<string, any> = yield select(chatSelector.getActiveChatRoom, {})
       room = room.setIn(['translation', uid, 'input'], input)
       room = room.setIn(['translation', uid, 'output'], output)
       yield put(chatActions.setCurrentChat(room))
    } catch (error) {
      yield put(globalActions.showMessage('chatSaga/dbGetPeerChatRoom : ' + error.message))

    }
}

/**
 * Active peer chat room
 */
function* activePeerChatRoom(receiverId: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
  try {
      let chatRoom: Map<string, any> = yield call(chatService.getPeerChatRoom, uid, receiverId )
      if (chatRoom) {
        yield put(chatActions.setCurrentChat(chatRoom))
      } else {
        const newChatRoom = new ChatRoom(
          '0',
          ChatRoomType.Peer,
          {
            [uid]: true,
            [receiverId]: true
          },
          uid,
          false,
        )
        if (!newChatRoom.lastMessage) {
          delete newChatRoom.lastMessage
        }
        if (!newChatRoom.speech) {
          delete newChatRoom.speech
        }
        if (!newChatRoom.translation) {
          delete newChatRoom.translation
        }
        if (!newChatRoom.userStatus) {
          delete newChatRoom.userStatus
        }

         chatRoom = yield call(chatService.createChatRoom, newChatRoom )
        yield put(chatActions.setCurrentChat(chatRoom))
      }
      const chatRoomId = chatRoom.get('id')
      yield call(dbFetchChatMessageOnce, chatRoomId)
      yield call(dbFetchChatMessages, chatRoomId)
  } catch (error) {
    yield put(globalActions.showMessage('chatSaga/activePeerChatRoom : ' + error.message))

  }
}
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

/**
 * Remove chat room message history
 */
function* dbRemoveRoomHistory(action: { type: ChatActionType, payload: any }) {
  const {roomId} = action.payload
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(chatService.removeHistoryRoom, roomId)
      yield put(chatActions.removeChatHistory(roomId))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Watch active peer chat room
 */
function* watchActivePeerChatRoom(action: { type: ChatActionType, payload: any }) {
  const {receiverId} = action.payload
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(activePeerChatRoom, receiverId)
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Watch chat messages
 */
function* watchChatMessages(action: { type: ChatActionType, payload: any }) {
  const {receiverId} = action.payload
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(dbFetchChatMessages as any, uid, receiverId)
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Watch chat messages
 */
function* watchSetLanguage(action: { type: ChatActionType, payload: any }) {
  const {input, output, roomId} = action.payload
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(setChatLanguage, uid, input, output, roomId)
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

export default function* chatSaga() {
    yield all([
      takeLatest(ChatActionType.DB_CREATE_CHAT_MESSAGE, dbCreateChatMessage),
      takeLatest(ChatActionType.DB_SUBSCRIBE_CHAT_MESSAGE, watchChatMessages),
      takeLatest(ChatActionType.ACTIVE_PEER_CHAT_ROOM, watchActivePeerChatRoom),
      takeLatest(ChatActionType.DB_REMOVE_CHAT_HISTORY, dbRemoveRoomHistory),
      takeLatest(ChatActionType.DB_SET_CHAT_LANGUAGE, watchSetLanguage),
    ])
  }
  