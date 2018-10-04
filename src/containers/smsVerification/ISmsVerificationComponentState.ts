import { SmsVerificationStepType } from './smsVerificationStepType'

export interface ISmsVerificationComponentState {

  /**
   * Phone number input value
   */
  phoneNumber: string

  /**
   * Phone number error
   */
  phoneNumberError: string

  /**
   * Verification code input value
   */
  code: string

  /**
   * Verification code error
   */
  codeError: string

  /**
   * Country locale code
   */
  countryCode: string

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
  step: SmsVerificationStepType

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
