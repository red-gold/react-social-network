// import { useFirebase } from './data/firebaseClient/dependecyRegisterar'
// import { useAws } from './data/awsClient/dependecyRegisterar'
import { useFirestore } from './data/firestoreClient/dependecyRegisterar'
import { Container } from 'inversify'
import CommonAPI from 'api/CommonAPI'

/**
 * Developer tools
 */
(window as any).logger = CommonAPI.logger

/**
 * Initialize container
 */
export const provider = new Container()

/**
 * Regeister dependencies
 */
// useFirebase(provider)
// useAws(provider)
useFirestore(provider)

// Features on the roadmap
// useAzure(provider)
// userAspNet(provider)
