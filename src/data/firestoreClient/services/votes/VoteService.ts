// - Import react components
import { firebaseAuth, db } from 'data/firestoreClient'

import { SocialError } from 'core/domain/common'
import { Vote } from 'core/domain/votes'
import { IVoteService } from 'core/services/votes'
import { injectable } from 'inversify'
import { Post } from 'core/domain/posts/post'

/**
 * Firbase vote service
 */
@injectable()
export class VoteService implements IVoteService {

  public addVote: (vote: Vote)
    => Promise<string> = (vote) => {
      return new Promise<string>((resolve,reject) => {
        const postRef = db.doc(`posts/${vote.postId}`)
        let voteRef = postRef.collection(`votes`).doc(vote.userId)
        .set({...vote})
        voteRef.then((result) => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }
  public getVotes: (postId: string)
    => Promise<{ [postId: string]: { [voteId: string]: Vote } }> = (postId) => {
      return new Promise<{ [postId: string]: { [voteId: string]: Vote } }>((resolve,reject) => {
        let votesRef = db.doc(`posts/${postId}`).collection(`votes`)

        votesRef.onSnapshot((snapshot) => {
          let parsedData: {[postId: string]: {[voteId: string]: Vote}} = {[postId]: {}}
          snapshot.forEach((result) => {
            parsedData[postId][result.id] = {
              ...result.data() as Vote
            }
          })
          resolve(parsedData)
        })

      })
    }

  public deleteVote: (userId: string, postId: string)
    => Promise<void> = (userId, postId) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const postRef = db.doc(`posts/${postId}`)
        let voteRef = postRef.collection(`votes`).doc(userId)

        batch.delete(voteRef)
        batch.commit().then(() => {
          resolve()
          
        })
        .catch((error) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }
}
