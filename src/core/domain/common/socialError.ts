export class SocialError extends Error {
  private _isError: Boolean

  constructor (private _code: string, private _message: string) {
    super(_message)
    this._isError = true
  }
    /**
     * Error code
     */
  public get code (): string {
    return this._code
  }

    /**
     * Error message
     */
  public get message (): string {
    return this._message
  }

    /**
     * If is error {true} if not {false}
     */

  public get isError (): Boolean {
    return this._isError
  }

}
