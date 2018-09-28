export class SocialError extends Error {
  private _isError: Boolean

  constructor (public code: string, public message: string) {
    super(message)
    this._isError = true
  }
   
}
