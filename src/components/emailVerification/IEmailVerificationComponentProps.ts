export interface IEmailVerificationComponentProps {

  /**
   * Send email for verification
   */
  sendEmailVerification: () => any

  /**
   * Redirect to home page
   */
  homePage: () => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any
}
