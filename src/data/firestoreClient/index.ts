import firebase from 'firebase'
import 'firebase/firestore'
import config from 'src/config'
try {
  let firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId
  }

  firebase.initializeApp(firebaseConfig)
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
