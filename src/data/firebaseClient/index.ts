declare const process: any

import firebase from 'firebase'

try {
  let config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  }

  console.log(firebase)
  firebase.initializeApp(config)
} catch (error) {
  console.log('=========Firebase initializer==============')
  console.log(error)
  console.log('====================================')
}

// - Storage reference
export let storageRef = firebase.storage().ref()

// - Database authorize
export let firebaseAuth = firebase.auth
export let firebaseRef = firebase.database().ref()

// - Firebase default
export default firebase
