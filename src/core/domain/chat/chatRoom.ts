import { ChatRoomType } from 'core/domain/chat/ChatRoomType'
import { Message } from 'core/domain/chat/message'
import { UserChatStatus } from './userChatStatus'

export class ChatRoom {
    constructor(
      public id: string,
      public type: ChatRoomType,
      public connections: {[userId: string]: boolean},
      public name: string,
      public isPublic: boolean = true,
      public lastMessage?: {
        message: Message,
        [userId: string]: Message
      },
      public speech?: {[userId: string]: boolean},
      public userStatus?: {[userId: string]: UserChatStatus},
      public translation?: {
        [userId: string]: { input: string, output: string}
      },

    ) {}
}