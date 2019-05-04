import { PostAPI } from 'api/PostAPI';
import { PostActionType } from 'constants/postActionType';
import { UserActionType } from 'constants/userActionType';
import { IPostService } from 'core/services/posts/IPostService';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { provider } from 'socialEngine';
import * as globalActions from 'store/actions/globalActions';
import * as postActions from 'store/actions/postActions';
import * as serverActions from 'store/actions/serverActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import * as userActions from 'store/actions/userActions';
import { authorizeSelector } from 'store/reducers/authorize';
import { circleSelector } from 'store/reducers/circles/circleSelector';
import { postSelector } from 'store/reducers/posts';
import { userSelector } from 'store/reducers/users/userSelector';

/**
 * Get service providers
 */
const postService: IPostService = provider.get<IPostService>(SocialProviderTypes.PostService)

/***************************** Subroutines ************************************/

/**
 * Fetch posts for stream
 */
function* dbFetchPostStream(userId: string, lastPostId: string, page: number, limit: number, searchKey: string) {
  const followingUsers: Map<string, any> = yield select(circleSelector.getFollowingUsers)
  const followingIds = followingUsers.keySeq()
  .map((key) => `ownerUserId:${key}`)
  .toArray()
  followingIds.push(`ownerUserId:${userId}`)

  const postResult: { posts: Map<string, any>, ids: Map<string, boolean>, newLastPostId: string, hasMore: boolean } = yield call(postService.searchPosts, '', followingIds.join(' OR '),lastPostId, page, limit, searchKey)
  if (!postResult.hasMore) {
    yield put(postActions.notMoreDataStream())
  }
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const streamServerRequest = PostAPI.createFetchStreamRequest(authedUser.get('uid'))
  streamServerRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(streamServerRequest))
  // Store last post Id
  yield put(postActions.lastPostStream(postResult.newLastPostId))
  yield put(postActions.addPosts(postResult.posts))
  yield put(postActions.addStreamPosts(postResult.ids))

}

/**
 * Search posts on server
 */
function* dbSearchPost(query: string, userId: string, lastPostId: string, page: number, limit: number, searchKey: string) {
  const followingUsers: Map<string, any> = yield select(circleSelector.getFollowingUsers)
  const followingIds = followingUsers.keySeq()
  .map((key) => `ownerUserId:${key}`)
  .toArray()
  followingIds.push(`ownerUserId:${userId}`)

  const postResult: { posts: Map<string, any>, ids: Map<string, boolean>, newLastPostId: string, hasMore: boolean } = yield call(postService.searchPosts, query, followingIds.join(' OR '),lastPostId, page, limit, searchKey)
  if (!postResult.hasMore) {
    yield put(postActions.notMorePostSearch())
  }
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const streamServerRequest = PostAPI.createSearchPostRequest(authedUser.get('uid'))
  streamServerRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(streamServerRequest))
  // Store last post Id
  yield put(postActions.lastPostSearch(postResult.newLastPostId))
  yield put(postActions.addPosts(postResult.posts))
  yield put(postActions.addSearchPosts(postResult.ids, page === 0))

}

/**
 * Fetch posts for user profile
 */
function* dbFetchPostByUserId(userId: string, lastPostId: string, page: number, limit: number, searchKey: string) {
  
  const postResult: { posts: Map<string, any>, ids: Map<string, boolean>, newLastPostId: string, hasMore: boolean } = 
  yield call(postService.getPostsByUserId, userId, lastPostId, page, limit, searchKey)
  if (!postResult.hasMore) {
    
    yield put(postActions.notMoreDataProfile(userId))
  }

  const profilePostsRequest = PostAPI.createFetchPostUserRequest(userId)
  profilePostsRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(profilePostsRequest))
  // Store last post Id
  yield put(postActions.lastPostProfile(userId, postResult.newLastPostId))

  yield put(postActions.addPosts(postResult.posts))
  yield put(userActions.addProfilePosts(userId, postResult.ids))

}

/**
 * Fetch album posts for user profile
 */
function* dbFetchAlbumPosts(userId: string, lastPostId: string, page: number, limit: number, searchKey: string) {
  
  const postResult: { posts: Map<string, any>, ids: Map<string, boolean>, newLastPostId: string, hasMore: boolean } = 
  yield call(postService.getAlbumPosts, userId, lastPostId, page, limit, searchKey)
  if (!postResult.hasMore) {
    
    yield put(userActions.notMoreDataAlbum(userId))
  }

  const profileAlbumsRequest = PostAPI.createFetchAlbumRequest(userId)
  profileAlbumsRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(profileAlbumsRequest))
  // Store last post Id
  yield put(userActions.lastPostAlbum(userId, postResult.newLastPostId))

  yield put(postActions.addPosts(postResult.posts))
  yield put(userActions.addProfileAlbums(userId, postResult.ids))

}

/**
 * Get search key from state if not generate new one from server
 */
function * getSearchKey() {
  let searchKey: string = yield select(postSelector.getSearchKey)
  if (!searchKey) {
    searchKey = yield call(postService.getSearchKey)
    yield put(postActions.setPostSearchKey(searchKey))
  }
  return searchKey

}

/**
 * Get post search key
 */
function* getPostSearchKey() {
  try {
    const searchKey: string = yield call(postService.getSearchKey)
    yield put(postActions.setPostSearchKey(searchKey))

  } catch (error) {
    yield put(globalActions.showMessage(error.message))
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

/**
 * Fetch posts from server
 */
function* watchFetchPostStream(action: { type: PostActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const streamServerRequest = PostAPI.createFetchStreamRequest(authedUser.get('uid'))
  yield put(serverActions.sendRequest(streamServerRequest))
  const { payload } = action
  const { page, limit } = payload
  const uid = authedUser.get('uid')
  try {
    const searchKey = yield getSearchKey()
    yield select(postSelector.getStreamPage)
    const lastPostId = yield select(postSelector.getStreamLastPostId)

    if (uid) {

      yield call(dbFetchPostStream, uid, lastPostId, page, limit, searchKey)
    }
  } catch (error) {
    yield put(globalActions.showMessage(error.message))
    yield put(postActions.notMoreDataStream())
  }

}

/**
 * Watch search post
 */
function* watchSearchPost(action: { type: PostActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const searchServerRequest = PostAPI.createSearchPostRequest(authedUser.get('uid'))
  yield put(serverActions.sendRequest(searchServerRequest))
  const { payload } = action
  const { query , page, limit } = payload
  const uid = authedUser.get('uid')
  try {
    const searchKey = yield getSearchKey()
    const lastPostId = yield select(postSelector.getSearchLastPostId)

    if (uid) {
      yield call(dbSearchPost, query, uid, lastPostId, page, limit, searchKey)
    }
  } catch (error) {
    yield put(globalActions.showMessage(error.message))
    yield put(postActions.notMorePostSearch())
  }

}

/**
 * Fetch posts by user identifier from server
 */
function* watchFetchPostByUserId(action: { type: PostActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const profilePostsRequest = PostAPI.createFetchPostUserRequest(authedUser.get('uid'))
  yield put(serverActions.sendRequest(profilePostsRequest))
  
  const { payload } = action
  const { page, limit, userId } = payload
  try {
    const searchKey =  yield getSearchKey()
    yield select(postSelector.getProfileLastPostRequest, {userId})
    const lastPostId = yield select(postSelector.getProfileLatPostId, {userId})
    
    const uid = authedUser.get('uid')
    if (uid) {
      yield call(dbFetchPostByUserId, userId, lastPostId, page, limit, searchKey)
    }
  } catch (error) {
    yield put(globalActions.showMessage(error.message))
  }

}

/**
 * Fetch album posts by user identifier from server
 */
function* watchFetchAlbumPosts(action: { type: PostActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const albumPostsPostsRequest = PostAPI.createFetchAlbumRequest(authedUser.get('uid'))
  yield put(serverActions.sendRequest(albumPostsPostsRequest))
  
  const { payload } = action
  const { limit, userId, page } = payload
  try {
    const searchKey = yield getSearchKey()
    yield select(userSelector.getAlbumLastPageRequest, {userId})
    const lastPostId = yield select(userSelector.getAlbumLatPostId, {userId})
    
    const uid = authedUser.get('uid')
    if (uid) {
      yield call(dbFetchAlbumPosts, userId, lastPostId, page, limit, searchKey)
    }
  } catch (error) {
    yield put(globalActions.showMessage(error.message))
  }

}

export default function* postSaga() {
  yield all([
    takeEvery(PostActionType.DB_GET_POST, watchFetchPostStream),
    takeEvery(PostActionType.DB_SEARCH_POST, watchSearchPost),
    takeEvery(PostActionType.DB_GET_POST_BY_USER_ID, watchFetchPostByUserId),
    takeEvery(UserActionType.DB_GET_ALBUM_POST_BY_USER_ID, watchFetchAlbumPosts),
    takeLatest(PostActionType.DB_GET_POST_SEARCH_KEY, getPostSearchKey),
  ])
}
