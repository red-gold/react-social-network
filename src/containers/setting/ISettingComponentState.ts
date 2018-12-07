
export interface ISettingComponentState {

  [key: string]: any

  /**
   * Password input value
   */
  passwordInput: string

  /**
   * Password input error text
   */
  passwordInputError: string

  /**
   * Confirm input value
   */
  confirmInput: string

  /**
   * Confirm input error
   */
  confirmInputError: string
}
