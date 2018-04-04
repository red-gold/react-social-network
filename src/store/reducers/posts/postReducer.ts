// - Import react components
import moment from 'moment/moment'
import _ from 'lodash'
import { Reducer, Action } from 'redux'
import { Map } from 'immutable'

// - Import action types
import { PostActionType } from 'constants/postActionType'

import { PostState } from './PostState'
import { IPostAction } from './IPostAction'
import { Post } from 'src/core/domain/posts/post'
import CommonAPI from 'src/api/CommonAPI'

const updatePost = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostOwnerId = post.get('ownerUserId')
  const updatePostId = post.get('id')
  return state
      .setIn(['userPosts', updatePostOwnerId, updatePostId], Map(post))
}

const updatePostComments = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostOwnerId = post.get('ownerUserId')
  const updatePostId = post.get('id')
  return state
      .setIn(['userPosts', updatePostOwnerId, updatePostId, 'comments'], post.get('comments'))
}

const updatePostVotes = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostOwnerId = post.get('ownerUserId')
  const updatePostId = post.get('id')
  return state
      .setIn(['userPosts', updatePostOwnerId, updatePostId, 'votes'],  post.get('votes'))
}

/**
 * Post reducer
 * @param {object} state
 * @param {object} action
 */
export let postReducer = (state = Map(new PostState()), action: IPostAction) => {
  const { payload } = action
  switch (action.type) {
    case PostActionType.CLEAR_ALL_DATA_POST:
      return Map(new PostState())

    case PostActionType.ADD_IMAGE_POST:
      return state
        .setIn(['userPosts', payload.uid, payload.post.id], Map(payload.post))

    case PostActionType.ADD_POST:
      return state
        .setIn(['userPosts', payload.uid, payload.post.id], Map(payload.post))

    case PostActionType.UPDATE_POST: return updatePost(state, payload)
    case PostActionType.UPDATE_POST_COMMENTS: return updatePostComments(state, payload)
    case PostActionType.UPDATE_POST_VOTES: return updatePostVotes(state, payload)

    case PostActionType.DELETE_POST:
      return state
        .deleteIn(['userPosts', payload.uid, payload.id])

    case PostActionType.ADD_LIST_POST:
      return state
        .mergeDeepIn(['userPosts'], payload.userPosts)
        .set('loaded', true)

    case PostActionType.HAS_MORE_DATA_STREAM:
      return state
        .setIn(['stream', 'hasMoreData'], true)

    case PostActionType.NOT_MORE_DATA_STREAM:
      return state
        .setIn(['stream', 'hasMoreData'], false)

    case PostActionType.REQUEST_PAGE_STREAM:
      return state
        .setIn(['stream', 'lastPageRequest'], payload.page)

    case PostActionType.LAST_POST_STREAM:
      return state
        .setIn(['stream', 'lastPostId'], payload.lastPostId)

    case PostActionType.HAS_MORE_DATA_PROFILE:
      return state
        .setIn(['profile', 'hasMoreData'], true)

    case PostActionType.NOT_MORE_DATA_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'hasMoreData'], false)

    case PostActionType.REQUEST_PAGE_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'lastPageRequest'], payload.page)

    case PostActionType.LAST_POST_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'lastPostId'], payload.lastPostId)

    default:
      return state

  }
}
