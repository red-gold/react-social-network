// - Import react components
import moment from 'moment'
import _ from 'lodash'



// - Import action types
import * as types from 'actionTypes'


/**
 * Default state
 */
var defaultState = {
  postComments: {},
  loaded:false
}


/**
 * Comment actions
 * @param {object} state 
 * @param {object} action 
 */
export var commentReducer = (state = defaultState, action) => {
  var { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case types.ADD_COMMENT:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments[payload.postId],
            [payload.id]: {
              ...payload.comment,
              editorStatus: false
            }
          }

        }
      }
    case types.ADD_COMMENT_LIST:
      return {
        ...state,
        postComments: {
          ...payload
        },
        loaded:true
      }
    case types.UPDATE_COMMENT:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments[payload.postId],
            [payload.id]: {
              ...state.postComments[payload.postId][payload.id],
              text: payload.text,
              editorStatus: payload.editorStatus
            }
          }
        }
      }
    case types.DELETE_COMMENT:
      var parsedComments = {}
      if (!state.postComments[payload.postId]) {
        return state
      }
      Object.keys(state.postComments[payload.postId]).map((id) => {
        if (id !== payload.id) {
          _.merge(parsedComments, { [id]: { ...state.postComments[payload.postId][id] } })
        }

      })
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...parsedComments
          }
        }
      }
    case types.CLOSE_COMMENT_EDITOR:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments[payload.postId],
            [payload.id]: {
              ...state.postComments[payload.postId][payload.id],
              editorStatus: false
            }
          }
        }
      }
    case types.OPEN_COMMENT_EDITOR:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments[payload.postId],
            [payload.id]: {
              ...state.postComments[payload.postId][payload.id],
              editorStatus: true
            }
          }
        }
      }

    case types.CLEAR_ALL_DATA_COMMENT:
      return defaultState


    default:
      return state;

  }


}
