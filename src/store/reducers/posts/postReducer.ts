// - Import react components
import moment from 'moment/moment'
import _ from 'lodash'
import { Reducer, Action } from 'redux'

// - Import action types
import { PostActionType } from 'constants/postActionType'

import { PostState } from './PostState'
import { IPostAction } from './IPostAction'
import { Post } from 'src/core/domain/posts/post'
import CommonAPI from 'src/api/CommonAPI'

/**
 * Post reducer
 * @param {object} state
 * @param {object} action
 */
export let postReducer = (state: PostState = new PostState(), action: IPostAction) => {
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
      const post: Post = payload.post
      return {
        ...state,
        userPosts: {
          ...state.userPosts,
          [post.ownerUserId!]: {
            ...state.userPosts[post.ownerUserId!],
            [payload.post.id]: {
              ...payload.post,
              comments: post.comments,
              votes: post.votes
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
      const newUserPosts = payload.userPosts as { [userId: string]: { [postId: string]: Post } }
      const mergedObject = _.merge(state.userPosts, newUserPosts)
      return {
        ...state,
        userPosts: {
          ...mergedObject
        },
        loaded: true

      }
    case PostActionType.HAS_MORE_DATA_STREAM:
      return {
        ...state,
        stream: {
          ...state.stream,
          hasMoreData: true
        }

      }
    case PostActionType.NOT_MORE_DATA_STREAM:
      return {
        ...state,
        stream: {
          ...state.stream,
          hasMoreData: false
        }

      }

    case PostActionType.REQUEST_PAGE_STREAM:
      return {
        ...state,
        stream: {
          ...state.stream,
          lastPageRequest: payload.page
        }
      }

    case PostActionType.LAST_POST_STREAM:
      return {
        ...state,
        stream: {
          ...state.stream,
          lastPostId: payload.lastPostId
        }
      }
    case PostActionType.HAS_MORE_DATA_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          hasMoreData: true
        }

      }
    case PostActionType.NOT_MORE_DATA_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          [payload.userId]: {
            ...state.profile![payload.userId],
            hasMoreData: false
          }
        }

      }

    case PostActionType.REQUEST_PAGE_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          [payload.userId]: {
            ...state.profile![payload.userId],
            lastPageRequest: payload.page

          }
        }
      }

    case PostActionType.LAST_POST_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          [payload.userId]: {
            ...state.profile![payload.userId],
            lastPostId: payload.lastPostId
          }
        }
      }
    default:
      return state

  }
}
