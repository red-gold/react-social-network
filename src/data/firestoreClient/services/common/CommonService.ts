// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'

import { SocialError, Feed } from 'core/domain/common'
import { ICommonService } from 'core/services/common'
import { injectable } from 'inversify'

/**
 * Firbase common service
 *
 * @export
 * @class CommonService
 * @implements {ICommonService}
 */
@injectable()
export class CommonService implements ICommonService {

  /**
   * Post feedback
   */
  public addFeed: (feed: Feed)
    => Promise<string> = (feed) => {
      return new Promise<string>((resolve, reject) => {
        let feedRef = db.collection(`feeds`).doc()
        feedRef.set({ ...feed, id: feedRef.id })
          .then(() => {
            resolve(feedRef.id)
          })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }
}
