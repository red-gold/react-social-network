import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as algoliasearch from 'algoliasearch'
import { HttpStatusCode } from './httpStatusCode'
import { SocialError } from '../domain/common'

// App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key

const serviceAccount = require('../lib/serviceAccountKey.json')

export const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

export const adminDB = admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://test-e28bf.firebaseio.com'
    })
const firestoreDB = adminDB.firestore()
const firebaseStorage = adminDB.storage()
const settings = {/* your settings... */ timestampsInSnapshots: true}
firestoreDB.settings(settings)
export {
  firestoreDB,
  firebaseStorage
}

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
export const validateFirebaseIdToken = (req: any, res: any, next: any) => {
    console.log('Check if request is authorized with Firebase ID token')
  
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !req.cookies.__session) {
      console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
          'Make sure you authorize your request by providing the following HTTP header:',
          'Authorization: Bearer <Firebase ID Token>',
          'or by passing a "__session" cookie.')
          res.status(HttpStatusCode.Forbidden).send(new SocialError('ServerError/Unauthorized', 'User is Unauthorized!'))
      return
    }
  
    let idToken
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      console.log('Found "Authorization" header')
      // Read the ID Token from the Authorization header.
      idToken = req.headers.authorization.split('Bearer ')[1]
    } else {
      console.log('Found "__session" cookie')
      // Read the ID Token from cookie.
      idToken = req.cookies.__session
    }
    adminDB.auth().verifyIdToken(idToken).then((decodedIdToken) => {
      console.log('ID Token correctly decoded', decodedIdToken)
      req.user = decodedIdToken
      return next()
    }).catch((error) => {
      console.error('Error while verifying Firebase ID token:', error)
      res.status(HttpStatusCode.Forbidden).send(new SocialError('ServerError/Unauthorized', 'User is Unauthorized!'))
    })
  }