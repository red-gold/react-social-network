export class SocialError{
    
    constructor(code: string, description: string){
        this._code = code
        this._description = description
        this._isError = true
    }

    /**
     * Error code
     * 
     * @type {string}
     * @memberof SocialError
     */
    private _code : string
    public get code() : string {
        return this._code
    }

    /**
     * Error description
     * 
     * @type {string}
     * @memberof SocialError
     */
    
    private _description : string
    public get description() : string {
        return this._description
    }
    

    /**
     * If is error {true} if not {false}
     * 
     * @type {Boolean}
     * @memberof SocialError
     */
    
    private _isError : Boolean
    public get isError() : Boolean {
        return this._isError
    }
    
}