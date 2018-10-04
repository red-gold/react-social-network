import { UserSettingActionType } from 'constants/userSettingActionType'

/**
 *  UserSetting action interface
 */
export interface IUserSettingAction {
  payload: any,
  type: UserSettingActionType

}
