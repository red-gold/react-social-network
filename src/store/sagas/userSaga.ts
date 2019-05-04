import { UserAPI } from 'api/UserAPI';
import { UserActionType } from 'constants/userActionType';
import { User } from 'core/domain/users';
import { IUserService } from 'core/services';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { provider } from 'socialEngine';
import * as globalActions from 'store/actions/globalActions';
import * as serverActions from 'store/actions/serverActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import * as userActions from 'store/actions/userActions';
import { authorizeSelector } from 'store/reducers/authorize';
import { circleSelector } from 'store/reducers/circles/circleSelector';
import { globalSelector } from 'store/reducers/global/globalSelector';
import { userSelector } from 'store/reducers/users/userSelector';

/**
 * Get service providers
 */
const userService: IUserService = provider.get<IUserService>(SocialProviderTypes.UserService)

/***************************** Subroutines ************************************/

/**
 * Fetch user profile
 */
function* dbFetchUserProfile(action: { type: UserActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const userProfile = yield call(userService.getUserProfile, uid)
      yield put(userActions.addUserInfo(uid, Map(userProfile)))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

function* dbFetchUserProfileById(action: { type: UserActionType, payload: any }) {
  const { uid, callerKey } = action.payload
  if (uid) {
    let caller = yield select(globalSelector.getCaller)
    try {

      if (caller && caller.indexOf(`dbGetUserInfoByUserId-${uid}`) > -1) {
        return undefined
      }
      yield put(globalActions.temp({ caller: `dbGetUserInfoByUserId-${uid}` }))
      const userProfile: User = yield call(userService.getUserProfile, uid)

      yield put(userActions.addUserInfo(uid, Map(userProfile)))

      switch (callerKey) {
        case 'header':
          yield put(globalActions.setHeaderTitle(userProfile.fullName))

          break

        default:
          break
      }
    } catch (error) {
      yield put(globalActions.showMessage(error.message))
    }

  }
}

/**
 * Fetch users for search
 */
function* dbSearchUser(userId: string, query: string, page: number, limit: number, searchKey: string) {
  const followingUsers: Map<string, any> = yield select(circleSelector.getFollowingUsers)
  const followingIds = followingUsers.keySeq()
  .map((key) => `userId:${key}`)
  .toArray()
  followingIds.push(`userId:${userId}`)

  const postResult: { users: Map<string, any>, ids: Map<string, boolean>, hasMore: boolean } = yield call(userService.searchUser, 
    query,
    `NOT userId:${userId}`,
    page, 
    limit, 
    searchKey)

  if (!postResult.hasMore) {
    yield put(userActions.notMoreSearchPeople())
  }
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const searchUserRequest = UserAPI.createUserSearchRequest(authedUser.get('uid'))
  searchUserRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(searchUserRequest))
  // Store last post Id
  yield put(userActions.addPeopleInfo(postResult.users))
  yield put(userActions.addUserSearch(postResult.ids, page === 0))

}

/**
 * Fetch users for finding people
 */
function* dbFindPeopls(userId: string, query: string, page: number, limit: number, searchKey: string) {
  const followingUsers: Map<string, any> = yield select(circleSelector.getFollowingUsers)
  const followingIds = followingUsers.keySeq()
  .map((key) => `userId:${key}`)
  .toArray()
  followingIds.push(`userId:-${userId}`)

  const postResult: { users: Map<string, any>, ids: Map<string, boolean>, hasMore: boolean } = yield call(userService.searchUser, 
    query,
    `NOT userId:${userId}`,
    page, 
    limit, 
    searchKey)

  if (!postResult.hasMore) {
    yield put(userActions.notMoreFindPeople())
  }
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const searchUserRequest = UserAPI.createUserSearchRequest(authedUser.get('uid'))
  searchUserRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(searchUserRequest))
  // Store last post Id
  yield put(userActions.addPeopleInfo(postResult.users))
  yield put(userActions.addFindPeople(postResult.ids))
}

/**
 * Get search key from state if not generate new one from server
 */
function * getSearchKey() {
  let searchKey: string = yield select(userSelector.getSearchKey)
  if (!searchKey) {
    searchKey = yield call(userService.getSearchKey)
    yield put(userActions.setPostSearchKey(searchKey))
  }
  return searchKey

}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

/**
 * Fetch posts from server
 */
function* watchFindPeople(action: { type: UserActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const streamServerRequest = UserAPI.createUserSearchRequest(authedUser.get('uid'))
  yield put(serverActions.sendRequest(streamServerRequest))
  const { payload } = action
  const { page, limit } = payload
  const uid = authedUser.get('uid')
  try {
    const searchKey = yield getSearchKey()
    if (uid) {
      yield call(dbFindPeopls, uid, '', page, limit, searchKey)
    }
  } catch (error) {
    yield put(globalActions.showMessage(error.message))
    yield put(userActions.notMoreFindPeople())
  }

}

/**
 * Fetch posts from server
 */
function* watchSearchUser(action: { type: UserActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const streamServerRequest = UserAPI.createUserSearchRequest(authedUser.get('uid'))
  yield put(serverActions.sendRequest(streamServerRequest))
  const { payload } = action
  const { query, page, limit } = payload
  const uid = authedUser.get('uid')
  try {
    const searchKey = yield getSearchKey()
    if (uid) {
      yield call(dbSearchUser, uid, query, page, limit, searchKey)
    }
  } catch (error) {
    yield put(globalActions.showMessage(error.message))
    yield put(userActions.notMoreSearchPeople())
  }

}

export default function* userSaga() {
  yield all([
    takeEvery(UserActionType.DB_FETCH_USER_SEARCH, watchSearchUser),
    takeEvery(UserActionType.DB_FETCH_FIND_PEOPLE, watchFindPeople),
    takeLatest(UserActionType.DB_FETCH_USER_PROFILE, dbFetchUserProfile),
    takeLatest(UserActionType.DB_FETCH_USER_PROFILE_BY_ID, dbFetchUserProfileById),
  ])
}
