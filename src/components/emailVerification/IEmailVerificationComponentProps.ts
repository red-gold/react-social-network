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
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any
}
