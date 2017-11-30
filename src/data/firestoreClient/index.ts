import firebase from 'firebase'
import 'firebase/firestore'
try {
  let config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  }

  firebase.initializeApp(config)
} catch (error) {
  console.log('=========Firebase firestore initializer==============')
  console.log(error)
  console.log('====================================')
}

// - Storage reference
export let storageRef = firebase.storage().ref()

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()

// - Database authorize
export let firebaseAuth = firebase.auth
export let firebaseRef = firebase.database().ref()

// - Firebase default
export default firebase
