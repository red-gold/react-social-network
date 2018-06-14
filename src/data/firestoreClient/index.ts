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
const db = firebase.firestore()
const settings = {timestampsInSnapshots: true}
db.settings(settings)
export {
  db
}
// - Database authorize
export let firebaseAuth = firebase.auth
export let firebaseRef = firebase.database().ref()

// - Firebase default
export default firebase
