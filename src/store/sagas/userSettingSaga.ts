import { UserSettingActionType } from 'constants/userSettingActionType';
import { IUserSettingService } from 'core/services/users';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { provider } from 'socialEngine';
import * as globalActions from 'store/actions/globalActions';
import * as userSettingActions from 'store/actions/userSettingActions';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';

/**
 * Get service providers
 */
const userSettingService: IUserSettingService = provider.get<IUserSettingService>(SocialProviderTypes.UserSettingService)

/***************************** Subroutines ************************************/

/**
 * Fetch user setting
 */
function* dbFetchUserSetting(action: { type: UserSettingActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const result = yield call(userSettingService.getUserSetting, uid)
      yield put(userSettingActions.updateUserSetting(Map(result)))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Update user setting
 */
function* dbUpdateUserSetting(action: { type: UserSettingActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    const { payload } = action
    try {
      yield call(userSettingService.updateUserSetting, uid, payload )
      yield put(userSettingActions.updateUserSetting(Map(payload)))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

export default function* userSettingSaga() {
    yield all([
      takeLatest(UserSettingActionType.DB_FETCH_USER_SETTING, dbFetchUserSetting),
      takeLatest(UserSettingActionType.DB_UPDATE_USER_SETTING, dbUpdateUserSetting)
      
    ])
  }
  