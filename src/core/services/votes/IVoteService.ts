import { User } from 'core/domain/users'
import { Vote } from 'core/domain/votes'

/**
 * Vote service interface
 *
 * @export
 * @interface IVoteService
 */
export interface IVoteService {
  addVote: (vote: Vote) => Promise<string>
  getVotes: () => Promise<{[postId: string]: {[voteId: string]: Vote}}>
  deleteVote: (voteId: string, postId: string) => Promise<void>
}
