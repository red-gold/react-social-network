import { BaseDomain } from 'core/domain/common'
import { MessageType } from 'core/domain/chat/MessageType'

export class Message extends BaseDomain {

    constructor(
        public id: string,
        public connection: { [key: string]: boolean },
        public creationDate: number,
        public message: string,
        public chatRoomId: string,
        public receiverId: string,
        public senderId: string,
        public type: MessageType.Text,
        public translation?: string,
        public translateMessage?: string
    ) {
        super()
    }
}