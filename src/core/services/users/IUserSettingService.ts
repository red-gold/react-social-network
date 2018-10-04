/**
 * User setting interface
 */
export interface IUserSettingService {
  
  /**
   * Get user setting
   */
  getUserSetting: (userId: string) => Promise<object>

  /**
   * Update user setting
   */
  updateUserSetting: (userId: string, setting: object) => Promise<void>
}
