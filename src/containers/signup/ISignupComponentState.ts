
export interface ISignupComponentState {

  [key: string]: any

  /**
   * Full name input value
   */
  fullNameInput: string

  /**
   * Full name input error text
   */
  fullNameInputError: string

  /**
   * Email input value
   */
  emailInput: string

  /**
   * Email input error text
   */
  emailInputError: string

  /**
   * Password input value
   */
  passwordInput: string

  /**
   * Passwor input error text
   */
  passwordInputError: string

  /**
   * Confirm input value
   */
  confirmInput: string

  /**
   * Confirm input error text
   */
  confirmInputError: string

  /**
   * Checkbox input error text
   */
  checkInputError?: string
}
