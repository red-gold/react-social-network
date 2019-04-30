
export interface ISignupMessageProps {

  /**
   * Come back to first signup step
   */
  resetStep: () => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any, param?: {}) => any
}
