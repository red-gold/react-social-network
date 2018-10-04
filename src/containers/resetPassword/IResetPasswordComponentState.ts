import {ResetPasswordStepType} from './resetPasswordStepType'
export interface IResetPasswordComponentState {

  /**
   * Phone number input value
   */
  email: string

  /**
   * Phone number error
   */
  emailError: string

  /**
   * Verification code input value
   */
  code: string

  /**
   * Verification code error
   */
  codeError: string

  /**
   * Whether OK button is disabled
   */
  isNextDisabled: boolean

  /**
   * Whether verify button is disabled
   */
  isVerifyDisabled: boolean

  /**
   * Step type of sms verification
   */
  step: ResetPasswordStepType

  /**
   * Phone verrification identifier
   */
  verifyId: string

  /**
   * Whether loading is enabled
   */
    loading: boolean

  /**
   * Whether captcha got success
   */
  isCaptchaSuccess: boolean

  /**
   * Captcha verifier
   */
  captchaVerifier: any

}
