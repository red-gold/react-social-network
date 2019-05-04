// - Import react components
import { UserSettingActionType } from 'constants/userSettingActionType';
import { Map } from 'immutable';

import { IUserSettingAction } from './IUserSettingAction';

// - Import action types
// Import domain

/**
 * UserSetting actions
 */
export let userSettingReducer = (state = Map({}), action: IUserSettingAction) => {
  let { payload } = action
  switch (action.type) {

    case UserSettingActionType.SET_USER_SETTING:
      return payload

    case UserSettingActionType.CLEAR_ALL_USER_SETTING:
      return Map({})

    default:
      return state
  }
}
