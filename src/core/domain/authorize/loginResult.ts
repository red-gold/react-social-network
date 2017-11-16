import { BaseDomain } from 'core/domain/common'

export class LoginUser extends BaseDomain {

  constructor (private _uid: string, private _emailVerified: boolean) {
    super()
  }

    /**
     * User identifier
     *
     * @type {string}
     * @memberof LoginUser
     */
  public get uid (): string {
    return this._uid
  }

  public get emailVerified (): boolean {
    return this._emailVerified
  }

}
