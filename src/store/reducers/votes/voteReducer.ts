// - Import react components
import moment from 'moment/moment'
import _ from 'lodash'
import { Map } from 'immutable'

// - Import action types
import { VoteActionType } from 'constants/voteActionType'

// Import domain
import { Vote } from 'src/core/domain/votes'

import { VoteState } from './VoteState'
import { IVoteAction } from './IVoteAction'

/**
 * Vote actions
 * @param {object} state
 * @param {object} action
 */
export let voteReducer = (state = Map(new VoteState()), action: IVoteAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case VoteActionType.ADD_VOTE:
    return state
    .setIn(['postVotes', payload.postId, payload.userId], payload)

    case VoteActionType.ADD_VOTE_LIST:
    return state
    .set('postVotes', payload)
    .set('loaded', true)

    case VoteActionType.DELETE_VOTE:
    return state
    .deleteIn(['postVotes', payload.postId, payload.userId])

    case VoteActionType.CLEAR_ALL_DATA_VOTE:
      return Map(new VoteState())

    default:
      return state

  }

}
