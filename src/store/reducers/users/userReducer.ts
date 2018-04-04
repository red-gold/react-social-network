// - Import action types
import { UserActionType } from 'constants/userActionType'
import { Map } from 'immutable'

// - Import domain
import { User, Profile } from 'src/core/domain/users'

import { UserState } from './UserState'
import { IUserAction } from './IUserAction'

/**
 * User reducer
 */
export let userReducer = (state = Map(new UserState()), action: IUserAction) => {
  const { payload } = action
  switch (action.type) {
    case UserActionType.USER_INFO:
      return state
        .setIn(['info', payload.uid], payload.info)

    case UserActionType.ADD_USER_INFO:
      return state
        .setIn(['info', payload.uid], payload.info)
        .set('loaded', true)

    case UserActionType.ADD_PEOPLE_INFO:
      return state
        .mergeIn(['info'], payload)

    case UserActionType.UPDATE_USER_INFO:
      return state
        .mergeIn(['info', payload.uid], payload.info)

    case UserActionType.CLEAR_ALL_DATA_USER:
      return Map(new UserState())

    case UserActionType.CLOSE_EDIT_PROFILE:
      return state
        .set('openEditProfile', false)

    case UserActionType.OPEN_EDIT_PROFILE:
      return state
        .set('openEditProfile', true)

    case UserActionType.HAS_MORE_DATA_PEOPLE:
      return state
        .setIn(['people', 'hasMoreData'], true)

    case UserActionType.NOT_MORE_DATA_PEOPLE:
      return state
        .setIn(['people', 'hasMoreData'], false)

    case UserActionType.REQUEST_PAGE_PEOPLE:
      return state
        .setIn(['people', 'lastPageRequest'], payload.page)

    case UserActionType.LAST_USER_PEOPLE:
      return state
        .setIn(['people', 'lastUserId'], payload.lastUserId)

    default:
      return state
  }
}
