// - Import react components
import moment from 'moment'
import _ from 'lodash'

// - Import action types
import {VoteActionType} from 'constants/voteActionType'

// Import domain
import { Vote } from 'core/domain/votes'


import { VoteState } from './VoteState'
import { IVoteAction } from './IVoteAction'


/**
 * Vote actions
 * @param {object} state 
 * @param {object} action 
 */
export let voteReducer = (state: VoteState = new VoteState(), action: IVoteAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case VoteActionType.ADD_VOTE:
      return {
        ...state,
        postVotes: {
          ...state.postVotes,
          [payload.postId]: {
            ...state.postVotes![payload.postId],
            [payload.id]: {
              ...payload
            }
          }

        }
      }
    case VoteActionType.ADD_VOTE_LIST:
      return {
        ...state,
        postVotes: {
          ...payload
        },
        loaded:true
      }
      
    case VoteActionType.DELETE_VOTE:
      let parsedVotes = {}
      if (state.postVotes![payload.postId])
      Object.keys(state.postVotes![payload.postId]).map((id) => {
        if (id !== payload.id) {
          _.merge(parsedVotes, { [id]: { ...state.postVotes![payload.postId][id] } })
        }

      })
      return {
        ...state,
        postVotes: {
          ...state.postVotes,
          [payload.postId]: {
            ...parsedVotes
          }
        }
      }


    case VoteActionType.CLEAR_ALL_DATA_VOTE:
      return new VoteState()


    default:
      return state

  }


}
