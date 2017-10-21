// - Import react components
import { firebaseRef, firebaseAuth } from 'app/firebaseClient/'

import { SocialError } from 'domain/common'
import { Vote } from 'domain/votes'
import { IVoteService } from 'services/votes'

/**
 * Firbase vote service
 *
 * @export
 * @class VoteService
 * @implements {IVoteService}
 */
export class VoteService implements IVoteService {

  public addVote: (vote: Vote)
    => Promise<string> = (vote) => {
      return new Promise<string>((resolve,reject) => {
        let voteRef = firebaseRef.child(`postVotes/${vote.postId}`)
        .push(vote)
        voteRef.then(() => {
          resolve(voteRef.key!)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }
  public getVotes: ()
    => Promise<{ [postId: string]: { [voteId: string]: Vote } }> = () => {
      return new Promise<{ [postId: string]: { [voteId: string]: Vote } }>((resolve,reject) => {
        let votesRef: any = firebaseRef.child(`postVotes`)

        votesRef.on('value',(snapshot: any) => {
          let postVotes: {[postId: string]: {[voteId: string]: Vote}} = snapshot.val() || {}
          resolve(postVotes)
        })

      })
    }

  public deleteVote: (voteId: string, postId: string)
    => Promise<void> = (voteId, postId) => {
      return new Promise<void>((resolve,reject) => {
        let updates: any = {}
        updates[`postVotes/${postId}/${voteId}`] = null
        firebaseRef.update(updates).then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

}
