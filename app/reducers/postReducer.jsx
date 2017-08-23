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
  userPosts: {},
  loaded: false
}


/**
 * Post reducer
 * @param {object} state 
 * @param {object} action 
 */
export var postReducer = (state = defaultState, action) => {
  const { payload } = action
  switch (action.type) {
    case types.CLEAR_ALL_DATA_POST:
      return defaultState

    case types.ADD_IMAGE_POST:
      return {
        ...state,
        userPosts: {
          ...state.userPosts,          
          [payload.uid]: {
            ...state.userPosts[payload.uid],
            [payload.post.id]: { ...payload.post }
          }
        }
      }

    case types.ADD_POST:
      return {
        ...state,
        userPosts: {
          ...state.userPosts,          
          [payload.uid]: {
            ...state.userPosts[payload.uid],
            [payload.post.id]: { ...payload.post }
          }
        }
      }

    case types.UPDATE_POST:
      return {
        ...state,
        userPosts: {
          ...state.userPosts,          
          [payload.uid]: {
            ...state.userPosts[payload.uid],
            [payload.post.id]: {
              ...state.userPosts[payload.uid][payload.post.id],
              ...payload.post 
            }
          }
        }
      }

    case types.DELETE_POST:
      let filteredPosts = {}
      Object.keys(state.userPosts[payload.uid]).map((key) => {
        if (key !== payload.id) {
          return _.merge(filteredPosts, { [key]: { ...state.userPosts[payload.uid][key] } })
        }
      })
      return {
        ...state,
        userPosts: {
          ...state.userPosts,          
          [payload.uid]: {
            ...filteredPosts
          }
        }
      }
    case types.ADD_LIST_POST:
      return {
        ...state,
        userPosts: {
          ...state.userPosts,
          [payload.uid]: {
            ...state.userPosts[payload.uid],
            ...payload.posts
          }
        },
        loaded:true

      }

    default:
      return state;

  }
}