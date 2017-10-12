export class SocialError {
    /**
     * Error code
     *
     * @type {string}
     * @memberof SocialError
     */
  private _code: string
  public get code (): string {
    return this._code
  }

    /**
     * Error message
     *
     * @type {string}
     * @memberof SocialError
     */

  private _message: string
  public get message (): string {
    return this._message
  }

    /**
     * If is error {true} if not {false}
     *
     * @type {Boolean}
     * @memberof SocialError
     */

  private _isError: Boolean
  public get isError (): Boolean {
    return this._isError
  }

  constructor (code: string, message: string) {
    this._code = code
    this._message = message
    this._isError = true
  }

}
