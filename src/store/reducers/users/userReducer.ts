// - Import action types
import { UserActionType } from 'constants/userActionType'
import Immutable, { Map, fromJS } from 'immutable'

// - Import domain
import { User } from 'src/core/domain/users'

import { UserState } from './UserState'
import { IUserAction } from './IUserAction'

const addUserSearch = (state: Map<string, any>, action: any) => {
  const { payload, meta } = action
  if (meta && meta.overwrite) {
    return state
      .setIn(['search', 'list'], payload.userIds)
  } else {
    return state
      .mergeIn(['search', 'list'], payload.userIds)
  }
}

/**
 * User reducer
 */
export let userReducer = (state: Map<string, any> = Map(new UserState()), action: IUserAction) => {
  const { payload } = action
  switch (action.type) {
    case UserActionType.SET_USER_SEARCH_KEY:
      return state
        .set('searchKey', payload.searchKey)

    case UserActionType.USER_INFO:
      return state
        .setIn(['entities', payload.uid], payload.info)

    case UserActionType.ADD_USER_INFO:
      return state
        .setIn(['entities', payload.uid], payload.info)
        .set('loaded', true)

    case UserActionType.ADD_PROFILE_LIST_POST:
      return state
        .mergeDeepIn(['post', payload.userId, 'list'], payload.postIds)
        .set('loaded', true)

    case UserActionType.ADD_PEOPLE_INFO:
      return state
        .mergeIn(['entities'], payload)

    case UserActionType.ADD_USER_SEARCH: return addUserSearch(state, action)

    case UserActionType.ADD_FIND_PEOPLE:
      return state
        .mergeIn(['findPeople', 'list'], payload.userIds)

    case UserActionType.UPDATE_USER_INFO:
      return state
        .mergeIn(['entities', payload.uid], payload.info)

    case UserActionType.CLEAR_ALL_DATA_USER:
      return Map(new UserState())

    case UserActionType.HAS_MORE_DATA_PROFILE:
      return state
        .setIn(['post', payload.userId, 'hasMoreData'], true)

    case UserActionType.NOT_MORE_DATA_PROFILE:
      return state
        .setIn(['post', payload.userId, 'hasMoreData'], false)

    case UserActionType.REQUEST_PAGE_PROFILE:
      return state
        .setIn(['post', payload.userId, 'lastPageRequest'], payload.page)

    case UserActionType.LAST_POST_PROFILE:
      return state
        .setIn(['post', payload.userId, 'lastPostId'], payload.lastPostId)

    case UserActionType.ADD_PROFILE_LIST_ALBUM:
      return state
        .mergeDeepIn(['album', payload.userId, 'list'], payload.postIds)
        .set('loaded', true)

    case UserActionType.INCREASE_PAGE_ALBUM:
      return state
        .setIn(['album', payload.userId, 'lastPageRequest'], state.getIn(['album', payload.userId, 'lastPageRequest'], 0) + 1)

    case UserActionType.HAS_MORE_DATA_ALBUM:
      return state
        .setIn(['album', payload.userId, 'hasMoreData'], true)

    case UserActionType.NOT_MORE_DATA_ALBUM:
      return state
        .setIn(['album', payload.userId, 'hasMoreData'], false)

    case UserActionType.REQUEST_PAGE_ALBUM:
      return state
        .setIn(['album', payload.userId, 'lastPageRequest'], payload.page)

    case UserActionType.LAST_POST_ALBUM:
      return state
        .setIn(['album', payload.userId, 'lastPostId'], payload.lastPostId)

    case UserActionType.CLOSE_EDIT_PROFILE:
      return state
        .set('openEditProfile', false)

    case UserActionType.OPEN_EDIT_PROFILE:
      return state
        .set('openEditProfile', true)

    case UserActionType.HAS_MORE_PEOPLE_SEARCH:
      return state
        .setIn(['search', 'hasMoreData'], true)

    case UserActionType.NOT_MORE_PEOPLE_SEARCH:
      return state
        .setIn(['search', 'hasMoreData'], false)

    case UserActionType.HAS_MORE_FIND_PEOPLE:
      return state
        .setIn(['findPeople', 'hasMoreData'], true)

    case UserActionType.NOT_MORE_FIND_PEOPLE:
      return state
        .setIn(['findPeople', 'hasMoreData'], false)

    case UserActionType.SET_FIND_PEOPLE_PAGE:
      return state
        .setIn(['findPeople', 'page'], payload.page)

    case UserActionType.INCREASE_FIND_PEOPLE_PAGE:
      return state
        .setIn(['findPeople', 'page'], (state.getIn(['findPeople', 'page'], 0) + 1))

    case UserActionType.LAST_USER_PEOPLE:
      return state
        .setIn(['findPeople', 'lastUserId'], payload.lastUserId)

    case UserActionType.INCREASE_FOLLOWING_COUNT_USER:
      return getIncreasedCounter(state, payload, 'followCount')

    case UserActionType.DECREASE_FOLLOWING_COUNT_USER:
      return getDecreasedCounter(state, payload, 'followCount')

    case UserActionType.INCREASE_VOTE_COUNT_USER:
      return getIncreasedCounter(state, payload, 'voteCount')

    case UserActionType.DECREASE_VOTE_COUNT_USER:
      return getDecreasedCounter(state, payload, 'voteCount')

    case UserActionType.INCREASE_POST_COUNT_USER:
      return getIncreasedCounter(state, payload, 'postCount')

    case UserActionType.DECREASE_POST_COUNT_USER:
      return getDecreasedCounter(state, payload, 'postCount')

    case UserActionType.INCREASE_SHARE_COUNT_USER:
      return getIncreasedCounter(state, payload, 'shareCount')

    case UserActionType.DECREASE_SHARE_COUNT_USER:
      return getDecreasedCounter(state, payload, 'shareCount')

    default:
      return state
  }
}

/**
 * Get increase for user counter
 */
const getIncreasedCounter = (state: Map<string, any>, payload: any, counterName: string) => {
  const count = state.getIn(['entities', payload.userId, counterName], 0) + 1
  return state
    .setIn(['entities', payload.userId, counterName], count)
}

/**
 * Get decrease for user counter
 */
const getDecreasedCounter = (state: Map<string, any>, payload: any, counterName: string) => {
  const count = state.getIn(['entities', payload.userId, counterName], 0) - 1
  return state
    .setIn(['entities', payload.userId, counterName], count)
}
