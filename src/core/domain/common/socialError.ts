export class SocialError extends Error {
  public isError: Boolean

  constructor (public code: string, public message: string) {
    super(message)
    this.isError = true
  }
}
