// - Import react components
var uuid = require('uuid');
import moment from 'moment'
import _ from 'lodash'
import {Reducer, Action} from "redux";


// - Import action types
import { postActionType } from "constants/postActionType";

/* ---------------- */


// - Import react components

/**
 * Default post state
 * 
 * @export
 * @interface IPostState
 */
export interface IPostState  {
  userPosts: any,
  loaded: boolean
}

/**
 * 
 * 
 * @export
 * @interface postState
 */
export interface IPostAction  {
  payload: any,
  type: postActionType

}

export class defaultPostState implements IPostState{
  userPosts: any = {};
  loaded: boolean = false;

}

/**
 * Post reducer
 * @param {object} state 
 * @param {object} action 
 */
export var postReducer = (state : IPostState = new defaultPostState(), action : IPostAction) => {
  const { payload } = action
  switch (action.type) {
    case postActionType.CLEAR_ALL_DATA_POST:
      return new defaultPostState()

    case postActionType.ADD_IMAGE_POST:
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

    case postActionType.ADD_POST:
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

    case postActionType.UPDATE_POST:
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

    case postActionType.DELETE_POST:
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
    case postActionType.ADD_LIST_POST:
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