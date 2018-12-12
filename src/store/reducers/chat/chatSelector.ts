import { Map, fromJS, List } from 'immutable'
import { createSelector } from 'reselect'
import { authorizeSelector } from 'store/reducers/authorize'
import { userSelector } from 'store/reducers/users/userSelector'
import { ChatMessageModel } from 'models/chat/chatMessageModel'
import { User } from 'src/core/domain/users'

const getActiveChatRoom: (state: Map<string, any>, props: any) => Map<string, any> = (state: Map<string, any>, props: any) => {
    const currentChatRoom: Map<string, any> = state.getIn(['chat', 'currentChat', 'chatRoom'], Map({}))
    return currentChatRoom   
}

const getCurrentReceiver: (state: Map<string, any>, props: any) => Map<string, any> = (state: Map<string, any>, props: any) => {
    const currentUserId = state.getIn(['authorize', 'uid'])
    const currentChatRoomConnections: Map<string, any> = state.getIn(['chat', 'currentChat', 'chatRoom', 'connections'])
    if (!currentChatRoomConnections) {
        return Map({})
    }
    const connectionsId = Object.keys(currentChatRoomConnections.toJS())
    const receiverId = connectionsId.filter((id) => id !== currentUserId)[0]
    const receiver = state.getIn(['user', 'entities', receiverId], Map({}))
    return receiver
}

const getCurrentMessaeges: (state: Map<string, any>, props: any) => Map<string, any> = (state: Map<string, any>, props: any) => {
    const currentChatRoomId: Map<string, any> = state.getIn(['chat', 'currentChat', 'chatRoom', 'id'])
    const messages = state.getIn(['chat', 'messages', currentChatRoomId], List())
    return messages
}

const selectCurrentChatRoom = () => {
    return createSelector(
        [getActiveChatRoom],
        (chatRoom) => chatRoom
    )
}

const selectCurrentReceiver = () => {
    return createSelector(
        [getCurrentReceiver],
        (userProfile) => userProfile
    )
}

const selectCurrentMessages = () => {
    return createSelector(
        [getCurrentMessaeges, authorizeSelector.getAuthedUser, userSelector.getUserProfileById],
        (messages, currentAuthed, receiverUser) => {
            const mes = messages.valueSeq().map((message: Map<string, any>) => (
           new ChatMessageModel(
            message.get('id'),
            message.get('senderId') === currentAuthed.get('uid') ? true : false,
            receiverUser.toJS() as User,
            message.get('type'),
            message.get('message'),
            message.get('creationDate'),
            message.get('translateMessage'),
            message.get('loading'),
          ))
        )
        .sort((a, b) => a.creationDate - b.creationDate)
        return mes
    }
    )
}

export const chatSelector = {
    selectCurrentReceiver,
    selectCurrentMessages,
    selectCurrentChatRoom,
    getActiveChatRoom
}