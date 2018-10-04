// - Import react components
import _ from 'lodash'
import { Map } from 'immutable'

// - Import action types
import { UserSettingActionType } from 'constants/userSettingActionType'

// Import domain

import { IUserSettingAction } from './IUserSettingAction'

/**
 * UserSetting actions
 */
export let userSettingReducer = (state = Map({}), action: IUserSettingAction) => {
  let { payload } = action
  const request = (payload ? payload.request : {})
  switch (action.type) {

    case UserSettingActionType.SET_USER_SETTING:
      return payload

    case UserSettingActionType.CLEAR_ALL_USER_SETTING:
      return Map({})

    default:
      return state
  }
}
