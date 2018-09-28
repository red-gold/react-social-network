
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB } from '../../data/index'
import { FieldValue } from '@google-cloud/firestore'

// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate')

// Creates a client
const translate = new Translate()
/**
 * Handle update chatroom
 */
export const onUpdateChatroom = functions.firestore
    .document(`chatroom/{roomId}`)
    .onUpdate((dataSnapshot, event) => {
        return new Promise((resolve, reject) => {
            var prevData = dataSnapshot.before.data()
            var newData = dataSnapshot.after.data()
            const roomId: string = event.params.roomId
            const message = newData.message
            const messagesRef = dataSnapshot.after.ref.collection('messages').doc()
            const newMessage = { ...message, id: messagesRef.id }
            messagesRef.set(newMessage)
                .then((result) => {
                    resolve(newMessage)
                })
        })
    })

/**
 * Create chat message
 */
export const createMessage = functions.https.onCall(async (data, context) => {
    const message = data.message
    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid
    const name = context.auth.token.name || null
    const picture = context.auth.token.picture || null
    const email = context.auth.token.email || null
    const messagesRef = firestoreDB.collection('chatroom')
    .doc(message.chatRoomId).collection('messages').doc(message.id)
    if (message.translation) {
        const result = await translate.translate(message.message, message.translation)
        console.log('translation', result[0])
        message.translateMessage = result[0]
        
    }
    const newMessage = { ...message, id: messagesRef.id }
    await messagesRef.set(newMessage)
    return { message: newMessage }
})
