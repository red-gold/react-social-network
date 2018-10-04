import { User } from 'core/domain/users'
import { MessageType } from 'core/domain/chat/MessageType'

export class ChatMessageModel {
    constructor(
     public id: string,
     public isCurrentUser: boolean,
     public receiverUser: User,
     public type: MessageType,
     public data: any,
     public creationDate:  number,
     public translateMessage?: string,
     public loading?: boolean
    ) {
        
    }
}