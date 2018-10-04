import {Map} from 'immutable'
export interface IConfigProps {

  /**
   * Styles
   */
  classes?: any

  /**
   * Go to home page
   */
  homePage?: () => void

  /**
   * Active language
   */
  currentLanguage?: string

  /**
   * Get user setting
   */
  getUserSetting?: () => any

  /**
   * Theme styles
   */
  theme?: any
  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any

  /**
   * User setting
   */
  userSetting?: Map<string, any>

}
