import * as functions from 'firebase-functions'
import { adminDB, firestoreDB, searchClient, validateFirebaseIdToken } from '../../data/index'
import * as moment from 'moment'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { SocialError } from '../../domain/common/index'
import { Verification } from '../../domain/authorize/verification'
import { HttpStatusCode } from '../../data/httpStatusCode'
import { UserPermissionType } from '../../domain/common/userPermissionType'
const request = require('request')
const cookieParser = require('cookie-parser')()

const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key

const app = express()
const cors = require('cors')({ origin: true })
app.disable('x-powered-by')
app.use(cors)
app.use(bodyParser.json())
app.use(cookieParser)
app.use(validateFirebaseIdToken)

/**
 * Get search key
 */
const getPostSearchKey = functions.https.onRequest((req, res) => {
    const userId = (req as any).user.uid

    // Create the params object as described in the Algolia documentation:
  // https://www.algolia.com/doc/guides/security/api-keys/#generating-api-keys
  const params = {
    // This filter ensures that only documents where author == user_id will be readable
    filters: `permission:${UserPermissionType.Public} OR accessUserList:${userId} OR ownerUserId:${userId}`,
    // We also proxy the user_id as a unique token for this key.
    userToken: userId,  
  }

  // Call the Algolia API to generate a unique key based on our search key
  const searchKey = searchClient.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params)
    
   res.status(HttpStatusCode.OK).json({searchKey})
})

/**
 * Get search key
 */
const getUserSearchKey = functions.https.onRequest((req, res) => {
    const userId = (req as any).user.uid

    // Create the params object as described in the Algolia documentation:
  // https://www.algolia.com/doc/guides/security/api-keys/#generating-api-keys
  const params = {
    // This filter ensures that only documents where author == user_id will be readable
    filters: `permission:${UserPermissionType.Public} OR accessUserList:${userId} OR userId:${userId}`,
    // We also proxy the user_id as a unique token for this key.
    userToken: userId,  
  }

  // Call the Algolia API to generate a unique key based on our search key
  const searchKey = searchClient.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params)
    
   res.status(HttpStatusCode.OK).json({searchKey})
})

app.get('/api/search/post', getPostSearchKey )
app.get('/api/search/user', getUserSearchKey )

export const search = functions.https.onRequest(app)
