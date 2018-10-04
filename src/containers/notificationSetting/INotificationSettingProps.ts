import {Map} from 'immutable'

export interface INotificationSettingProps {
  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any

  /**
   * User setting
   */
  userSetting: Map<string, any>

  /**
   * Update user setting
   */
  updateUserSetting?: (setting: object) => any

}
