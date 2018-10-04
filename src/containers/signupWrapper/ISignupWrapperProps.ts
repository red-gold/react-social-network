
export interface ISignupWrapperProps {

  /**
   * Styles
   */
  classes?: any

  /**
   * Go to login page
   */
  loginPage?: () => void

  /**
   * Theme styles
   */
  theme?: any

  /**
   * Active language
   */
  currentLanguage?: string

  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any
}
