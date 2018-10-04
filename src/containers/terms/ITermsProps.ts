
export interface ITermsProps {

  /**
   * Styles
   */
  classes?: any

  /**
   * Go to signup page
   */
  signupPage?: () => void

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
