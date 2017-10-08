import { BaseDomain } from "domain/common";

class User extends BaseDomain {
    /**
     * Email of the user
     * 
     * @type {string}
     * @memberof User
     */
    public email: string;

    /**
     * Password of the user
     * 
     * @type {string}
     * @memberof User
     */
    public password: string;

    /**
     * User identifier
     * 
     * @type {string}
     * @memberof User
     */
    public userId: string;
    
}

export default User;