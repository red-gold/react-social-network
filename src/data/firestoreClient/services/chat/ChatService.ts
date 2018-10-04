// - Import react components
import firebase, { firebaseAuth, db, functions } from 'data/firestoreClient'
import { take, fork, select, put, call, cancelled, all, takeEvery, takeLatest } from 'redux-saga/effects'
import moment from 'moment/moment'
import { Map, fromJS } from 'immutable'

import { SocialError } from 'core/domain/common'
import { IChatService } from 'core/services/chat'
import { injectable } from 'inversify'
import { Message } from 'core/domain/chat/message'
import { ChatRoom } from 'core/domain/chat/chatRoom'
import { ChatRoomType } from 'core/domain/chat/ChatRoomType'

/**
 * Firbase userSetting service
 */
@injectable()
export class ChatService implements IChatService {

  /**
   * Constructor
   */
  constructor() {
    this.removeHistoryRoom = this.removeHistoryRoom.bind(this)
    this.removeMessagesByBatch = this.removeMessagesByBatch.bind(this)
    this.romveMessages = this.romveMessages.bind(this)
  }

  /**
   * Create chat room
   */
  public createChatRoom: (chatRoom: ChatRoom)
    => Promise<Map<string, any>> = (chatRoom) => {
      return new Promise<Map<string, any>>((resolve, reject) => {
        let chatRoomRef = db.collection('chatroom').doc()
        const newChatRoom = { ...chatRoom, id: chatRoomRef.id }
        chatRoomRef.set(newChatRoom)
          .then(() => {
            resolve(fromJS(newChatRoom))
          })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/createChatRoom : ' + error.message)))
      })
    }

  /**
   * Get chat room
   */
  public getPeerChatRoom: (firstUserId: string, secondUserId: string)
    => Promise<Map<string, any>> = (firstUserId, secondUserId) => {
      return new Promise<Map<string, any>>((resolve, reject) => {
        let chatRoomRef = db.collection('chatroom')
          .where(`connections.${firstUserId}`, '==', true)
          .where(`connections.${secondUserId}`, '==', true)
          .where(`type`, '==', ChatRoomType.Peer)
          .get().then((result) => {
            if (!result.empty && result.size > 0) {
              resolve(fromJS(result.docs[0].data()))
            } else {
              resolve(undefined)
            }

          })
      })
    }

  /**
   * Create chat message
   */
  public createChatMessage: (message: Message)
    => Promise<Map<string, any>> = (message) => {
      return new Promise<Map<string, any>>((resolve, reject) => {
        var addMessage = functions.httpsCallable('createMessage')
        addMessage({ message: { ...message } }).then((result) => {
          // Read result of the Cloud Function.
          var sanitizedMessage = result.data.message
          resolve(Map(sanitizedMessage))
        })
      })
    }

  /**
   * Set chat language
   */
  public setChatLangauge: (uid: string, input: string, output: string, roomId: string)
    => Promise<void> = (uid, input, output, roomId) => {
      return new Promise<void>((resolve, reject) => {
        let updateData: any = {}
        updateData[`translation.${uid}.input`] = input ? input : firebase.firestore.FieldValue.delete()
        updateData[`translation.${uid}.output`] = output ? output : firebase.firestore.FieldValue.delete()
        db.collection('chatroom').doc(roomId)
          .update(updateData).then(() => {
            resolve()
          })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/setChatLangauge : ' + error.message)))

      })
    }

  /**
   * Get chat messages
   */
  public subscribeChatMessages: (chatRoomId: string,
    callback: (messages: Map<string, any>) => void)
    => any = (chatRoomId, callback) => {
      const currentDate = moment().unix()

      let messagesRef = db
        .collection('chatroom')
        .doc(chatRoomId)
        .collection('messages')
        .where(`creationDate`, '>', currentDate)
        .orderBy('creationDate')

      return messagesRef.onSnapshot((result) => {
        let messageList: Map<string, any> = Map({})
        result.docChanges()
          .forEach((change) => {
            const { doc } = change
            messageList = messageList.set(doc.id, Map(doc.data()))
          })
        callback(messageList)
      })
    }

  /**
   * Get chat messages
   */
  public getChatMessages: (chatRoomId: string)
    => Promise<Map<string, any>> = (chatRoomId: string) => {
      return new Promise<Map<string, any>>((resolve, reject) => {
        let messagesRef = db
          .collection('chatroom')
          .doc(chatRoomId)
          .collection('messages')
          .orderBy('creationDate')
        messagesRef
          .get().then((result) => {
            let messageList: Map<string, any> = Map({})
            result.forEach((message) => {
              messageList = messageList.set(message.id, Map(message.data()))
            })
            resolve(messageList)

          })

      })
    }

  /**
   * Remove chat room history
   */
  * removeHistoryRoom(chatRoomId: string) {
    let messagesRef = db
      .collection('chatroom')
      .doc(chatRoomId).collection('messages')
    const result: firebase.firestore.QuerySnapshot = yield messagesRef.get()
    let docsSize = result.size
    let counter = 0
    let refs: firebase.firestore.DocumentReference[] = []
    let refGroup: firebase.firestore.DocumentReference[][] = []
    for (let index = 0; index < result.docs.length; index++) {
      const message = result.docs[index]
      refs.push(message.ref)
      counter++
      if (counter % 10 === 0 || docsSize === counter) {
        refGroup.push([...refs])
        refs = []
        if (docsSize === counter) {
          yield call(this.romveMessages, refGroup)
        }
      }
    }
  }

  * removeMessagesByBatch(refList: firebase.firestore.DocumentReference[]) {
    const batch = db.batch()

    for (let index = 0; index < refList.length; index++) {
      const docRef = refList[index]
      batch.delete(docRef)
    }
    yield batch.commit()
  }

  * romveMessages(refs: firebase.firestore.DocumentReference[][]) {
    for (let index = 0; index < refs.length; index++) {
      const refList = refs[index]
      yield call(this.removeMessagesByBatch, refList)
    }
  }

}