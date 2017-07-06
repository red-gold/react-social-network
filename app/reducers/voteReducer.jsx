// - Import react components
import moment from 'moment'
import _ from 'lodash'



// - Import action types
import * as types from 'actionTypes'


/**
 *  Default state
 */
var defaultState = {
  postVotes: {},
  loaded:false
}


/**
 * Vote actions
 * @param {object} state 
 * @param {object} action 
 */
export var voteReducer = (state = defaultState, action) => {
  var { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case types.ADD_VOTE:
      return {
        ...state,
        postVotes: {
          ...state.postVotes,
          [payload.postId]: {
            ...state.postVotes[payload.postId],
            [payload.id]: {
              ...payload.vote
            }
          }

        }
      }
    case types.ADD_VOTE_LIST:
      return {
        ...state,
        postVotes: {
          ...payload
        },
        loaded:true
      }
      
    case types.DELETE_VOTE:
      var parsedVotes = {}
      if (state.postVotes[payload.postId])
      Object.keys(state.postVotes[payload.postId]).map((id) => {
        if (id !== payload.id) {
          _.merge(parsedVotes, { [id]: { ...state.postVotes[payload.postId][id] } })
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


    case types.CLEAR_ALL_DATA_VOTE:
      return defaultState


    default:
      return state;

  }


}
