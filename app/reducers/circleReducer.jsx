// - Import react components
var uuid = require('uuid');
import moment from 'moment'
import _ from 'lodash'

// - Import action types
import * as types from 'actionTypes'

/* ---------------- */


/**
 * Default State
 */
var defaultState = {
  userCircles: {},
  loaded: false
}


/**
 * Circle reducer
 * @param {object} state 
 * @param {object} action 
 */
export var circleReducer = (state = defaultState, action) => {
  const { payload } = action
  switch (action.type) {
    case types.CLEAR_ALL_CIRCLES:
      return defaultState

    case types.ADD_CIRCLE:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles[payload.uid],
            [payload.circle.id]: { ...payload.circle }
          }
        }
      }

    case types.UPDATE_CIRCLE:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles[payload.uid],
            [payload.circle.id]: { 
              ...state.userCircles[payload.uid][payload.circle.id],
              ...payload.circle,
              openCircleSettings:false }
          }
        }
      }

    case types.DELETE_CIRCLE:
      let filteredCircles = {}
      Object.keys(state.userCircles[payload.uid]).map((key) => {
        if (key !== payload.id) {
          return _.merge(filteredCircles, { [key]: { ...state.userCircles[payload.uid][key] } })
        }
      })
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...filteredCircles
          }
        }
      }
    case types.ADD_LIST_CIRCLE:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles[payload.uid],
            ...payload.circles
          }
        },
        loaded:true

      }

      case types.ADD_FOLLOWING_USER:
       return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles[payload.uid],
            [payload.cid]: {
               ...state.userCircles[payload.uid][payload.cid],
               users:{
                 ...state.userCircles[payload.uid][payload.cid].users,
                [payload.followingId]: {
                  ...payload.userCircle
                }
               }
             }
          }
        }
      }

       case types.DELETE_FOLLOWING_USER:
        let filteredUserCircle = {}
      Object.keys(state.userCircles[payload.uid][payload.cid].users).map((key) => {
        if (key !== payload.followingId) {
          return _.merge(filteredUserCircle, { [key]: { ...state.userCircles[payload.uid][payload.cid].users[key] } })
        }
      })
       return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles[payload.uid],
            [payload.cid]: {
               ...state.userCircles[payload.uid][payload.cid],
               users:{
                ...filteredUserCircle
               }
             }
          }
        }
      }
    
        case types.CLOSE_CIRCLE_SETTINGS:
         return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles[payload.uid],
            [payload.id]: {
               ...state.userCircles[payload.uid][payload.id],
               openCircleSettings: false
             }
          }
        }
      }

    case types.OPEN_CIRCLE_SETTINGS:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles[payload.uid],
            [payload.id]: {
               ...state.userCircles[payload.uid][payload.id],
               openCircleSettings: true
             }
          }
        }
      }

    default:
      return state;

  }
}
