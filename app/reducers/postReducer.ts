// - Import react components
var uuid = require('uuid');
import moment from 'moment'
import _ from 'lodash'
import {Reducer, Action} from "redux";


// - Import action types
import { PostActionType } from "constants/postActionType";

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
 * @interface IPostAction
 */
export interface IPostAction  {
  payload: any,
  type: PostActionType

}

/**
 * Default post reducer state
 * 
 * @export
 * @class DefaultPostState
 * @implements {IPostState}
 */
export class DefaultPostState implements IPostState{
  userPosts: any = {};
  loaded: boolean = false;

}

/**
 * Post reducer
 * @param {object} state 
 * @param {object} action 
 */
export var postReducer = (state : IPostState = new DefaultPostState(), action : IPostAction) => {
  const { payload } = action;
  switch (action.type) {
    case PostActionType.CLEAR_ALL_DATA_POST:
      return new DefaultPostState()

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
      return state;

  }
}