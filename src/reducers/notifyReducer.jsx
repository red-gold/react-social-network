// - Import react components
import moment from 'moment'
import _ from 'lodash'



// - Import action types
import * as types from 'actionTypes'


/**
 * Default state
 */
var defaultState = {
  userNotifies: {},
  loaded:false
}


/**
 * Notify actions
 * @param {object} state 
 * @param {object} action 
 */
export var notifyReducer = (state = defaultState, action) => {
  var { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case types.ADD_NOTIFY:
      return state
      
    case types.ADD_NOTIFY_LIST:
      return {
        ...state,
        userNotifies: {
          ...payload
        },
        loaded:true
      }

      case types.SEEN_NOTIFY:
      return {
        ...state,
        userNotifies: {
          ...state.userNotifies,
          [payload]:{
            ...state.userNotifies[payload],
            isSeen:true
          }
        },
        loaded:true
      }
 
    case types.DELETE_NOTIFY:
      var parsedNotifies = {}
      Object.keys(state.userNotifies).map((id) => {
        if (id !== payload) {
          _.merge(parsedNotifies, { [id]: { ...state.userNotifies[id] } })
        }

      })
      return {
        ...state,
        userNotifies: {
            ...parsedNotifies
        }
      }
  

    case types.CLEAR_ALL_DATA_NOTIFY:
      return defaultState


    default:
      return state;

  }


}
