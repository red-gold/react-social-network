
export interface ILoginComponentState {

  [key: string]: any

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
   * Password input error text
   */
  passwordInputError: string

  /**
   * Confirm input error text
   */
  confirmInputError: string
}
