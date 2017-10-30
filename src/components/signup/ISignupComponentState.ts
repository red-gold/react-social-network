
export interface ISignupComponentState {

  /**
   * Full name input value
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  fullNameInput: string

  /**
   * Full name input error text
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  fullNameInputError: string

  /**
   * Email input value
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  emailInput: string

  /**
   * Email input error text
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  emailInputError: string

  /**
   * Password input value
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  passwordInput: string

  /**
   * Passwor input error text
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  passwordInputError: string

  /**
   * Confirm input value
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  confirmInput: string

  /**
   * Confirm input error text
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  confirmInputError: string

  /**
   * Checkbox input error text
   *
   * @type {string}
   * @memberof ISignupComponentState
   */
  checkInputError?: string
}
