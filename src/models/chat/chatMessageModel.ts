import { MessageType } from 'core/domain/chat/MessageType';
import { User } from 'core/domain/users';

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