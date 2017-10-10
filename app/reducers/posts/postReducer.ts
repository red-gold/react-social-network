// - Import react components
import moment from 'moment'
import _ from 'lodash'
import {Reducer, Action} from 'redux'


// - Import action types
import { PostActionType } from 'constants/postActionType'


import { PostState } from './PostState'
import { IPostAction } from './IPostAction'


/**
 * Post reducer
 * @param {object} state 
 * @param {object} action 
 */
export let postReducer = (state : PostState = new PostState(), action : IPostAction) => {
  const { payload } = action
  switch (action.type) {
    case PostActionType.CLEAR_ALL_DATA_POST:
      return new PostState()

    case PostActionType.ADD_IMAGE_POST:
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

    case PostActionType.ADD_POST:
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

    case PostActionType.UPDATE_POST:
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

    case PostActionType.DELETE_POST:
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
    case PostActionType.ADD_LIST_POST:
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
      return state

  }
}