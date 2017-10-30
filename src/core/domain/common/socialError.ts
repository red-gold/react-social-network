export class SocialError {
    /**
     * Error code
     *
     * @type {string}
     * @memberof SocialError
     */
  public get code (): string {
    return this._code
  }

    /**
     * Error message
     *
     * @type {string}
     * @memberof SocialError
     */
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

  constructor (private _code: string, private _message: string) {
    this._isError = true
  }

}
