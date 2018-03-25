import { Vote } from 'src/core/domain/votes'

/**
 * Vote state
 *
 * @export
 * @class VoteState
 */
export class VoteState {

    /**
     * The list of posts vote
     *
     * @type {({[postId: string]: {[voteId: string]: Vote}} | null)}
     * @memberof VoteState
     */
  postVotes: {[postId: string]: {[voteId: string]: Vote}} | null = null

    /**
     * If posts vote are loaded {true} or not {false}
     *
     * @type {Boolean}
     * @memberof VoteState
     */
  loaded: Boolean = false
}
