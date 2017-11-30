// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'

import { SocialError } from 'core/domain/common'
import { Vote } from 'core/domain/votes'
import { IVoteService } from 'core/services/votes'

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
        const postRef = db.doc(`posts/${vote.postId}`)
        let voteRef = postRef.collection(`votes`)
        .add(vote)
        voteRef.then((result) => {
          resolve(result.id)
          /**
           * Add score
           */
          db.runTransaction((transaction) => {
            return transaction.get(postRef).then((postDoc) => {
              if (postDoc.exists) {
                const post = postDoc.data()
                let {votes, score} = post
                if (!votes) {
                  votes = {}
                }
                if (!score) {
                  score = 0
                }
                const newScore = score + 1
                votes[vote.userId] = true
                transaction.update(postRef, { votes: { ...votes}, score: newScore })
              }
            })
          })
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
              id: result.id,
              ...result.data() as Vote
            }
          })
          resolve(parsedData)
        })

      })
    }

  public deleteVote: (vote: Vote)
    => Promise<void> = (vote) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const postRef = db.doc(`posts/${vote.postId}`)
        let voteRef = postRef.collection(`votes`).doc(vote.id!)

        batch.delete(voteRef)
        batch.commit().then(() => {
          resolve()
          /**
           * Remove score
           */
          db.runTransaction((transaction) => {
            return transaction.get(postRef).then((postDoc) => {
              if (postDoc.exists) {
                const post = postDoc.data()
                let {votes, score} = post
                if (!votes) {
                  votes = {}
                }
                if (!score) {
                  score = 0
                }
                const newScore = score + 1
                votes[vote.userId] = true
                transaction.update(postRef, { votes: { ...votes}, score: newScore })
              }
            })
          })
        })
        .catch((error) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }
}
