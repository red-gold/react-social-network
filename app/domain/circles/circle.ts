import { BaseDomain } from "domain/common";
import { User } from "domain/users";

export class Circle extends BaseDomain {
    
    /**
     * Circle identifier
     * 
     * @type {string}
     * @memberof User
     */
    public id?: string | null;

    /**
     * Circle creation date time
     * 
     * @type {Date}
     * @memberof Circle
     */
    public creationDate?: number;

    /**
     * Circle owner identifier
     * 
     * @type {string}
     * @memberof Circle
     */
    public ownerId?: string | null;

    /**
     * Circle name
     * 
     * @type {string}
     * @memberof User
     */
    public name: string;

    /**
     * The users in a circle
     * 
     * @type {string}
     * @memberof User
     */
    public users: {[userId:string]: User};

   
    
}
