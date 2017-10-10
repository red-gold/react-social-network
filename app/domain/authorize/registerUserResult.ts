import { BaseDomain } from 'domain/common'

export class RegisterUserResult extends BaseDomain{

    constructor(uid: string){
        super()

        this._uid = uid
    }
    /**
     * User identifier
     * 
     * @type {string}
     * @memberof LoginUser
     */
    
    private _uid : string
    public get uid (): string {
        return this._uid
    }
}

    
