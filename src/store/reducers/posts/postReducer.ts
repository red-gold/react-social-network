// - Import react components
import { PostActionType } from 'constants/postActionType';
import { Map } from 'immutable';

import { IPostAction } from './IPostAction';
import { PostState } from './PostState';

// - Import action types
const updatePost = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostId = post.get('id')
  return state
    .setIn(['entities', updatePostId], post)
}

const updatePostComments = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostId = post.get('id')
  return state
    .setIn(['entities', updatePostId, 'comments'], post.get('comments'))
    .setIn(['entities', updatePostId, 'commentCounter'], post.get('commentCounter'))
}

const updatePostVotes = (state: any, payload: any) => {
  const post: Map<string, any> = payload.post
  const updatePostId = post.get('id')
  return state
    .setIn(['entities', updatePostId, 'votes'], post.get('votes'))
    .setIn(['entities', updatePostId, 'score'], post.get('score'))
}

const addSearchPosts = (state: any, action: any) => {
  const { meta, payload } = action
  if (meta && meta.overwrite) {
    return state
      .setIn(['search', 'list'], payload.postIds)
      .set('loaded', true)

  } else {
    return state
      .mergeDeepIn(['search', 'list'], payload.postIds)
      .set('loaded', true)
  }
}

/**
 * Post reducer
 */
export let postReducer = (state = Map(new PostState() as any), action: IPostAction) => {
  const { payload } = action
  switch (action.type) {
    case PostActionType.CLEAR_ALL_DATA_POST:
      return Map(new PostState() as any)

    case PostActionType.SET_POST_SEARCH_KEY:
      return state
        .set('searchKey', payload.searchKey)

    case PostActionType.ADD_IMAGE_POST:
      return state
        .setIn(['entities', payload.post.get('id')], payload.post)

    case PostActionType.ADD_POST:
      return state
        .setIn(['entities', payload.post.get('id')], payload.post)

    case PostActionType.UPDATE_POST: return updatePost(state, payload)
    case PostActionType.UPDATE_POST_COMMENTS: return updatePostComments(state, payload)
    case PostActionType.UPDATE_POST_VOTES: return updatePostVotes(state, payload)

    case PostActionType.DELETE_POST:
      return state
        .deleteIn(['entities', payload.id])

    case PostActionType.ADD_LIST_POST:
      return state
        .mergeDeepIn(['entities'], payload.entities)
        .set('loaded', true)

    case PostActionType.ADD_LIST_STREAM_POST:
      return state
        .mergeIn(['stream', 'list'], payload.postIds)
        .set('loaded', true)

    case PostActionType.ADD_LIST_SEARCH_POST: return addSearchPosts(state, action)

    case PostActionType.HAS_MORE_POST_SEARCH:
      return state
        .setIn(['search', 'hasMoreData'], true)

    case PostActionType.NO_MORE_POST_SEARCH:
      return state
        .setIn(['search', 'hasMoreData'], false)

    case PostActionType.ADD_LIST_POST_INSTAGRAM:
      return state
        .mergeDeepIn(['instagram'], payload.posts)

    case PostActionType.HAS_MORE_DATA_STREAM:
      return state
        .setIn(['stream', 'hasMoreData'], true)

    case PostActionType.NOT_MORE_DATA_STREAM:
      return state
        .setIn(['stream', 'hasMoreData'], false)

    case PostActionType.SET_PAGE_STREAM:
      return state
        .setIn(['stream', 'lastPageRequest'], payload.page)

    case PostActionType.INCREASE_PAGE_STREAM:
      return state
        .setIn(['stream', 'lastPageRequest'], state.getIn(['stream', 'lastPageRequest'], 0) + 1)

    case PostActionType.LAST_POST_STREAM:
      return state
        .setIn(['stream', 'lastPostId'], payload.lastPostId)

    case PostActionType.LAST_POST_SEARCH:
      return state
        .setIn(['search', 'lastPostId'], payload.lastPostId)

    default:
      return state

  }
}
