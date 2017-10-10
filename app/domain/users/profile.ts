import { BaseDomain } from 'domain/common'

export class Profile extends BaseDomain {
    
    /**
     * User avatar address
     * 
     * @type {string}
     * @memberof Profile
     */
   public avatar: string

   /**
    * User email
    * 
    * @type {string}
    * @memberof Profile
    */
   public email: string

   /**
    * User full name
    * 
    * @type {string}
    * @memberof Profile
    */
   public fullName: string

   /**
    * The banner address of user profile
    * 
    * @type {string}
    * @memberof Profile
    */
   public banner: string

   /**
    * User tag line
    * 
    * @type {string}
    * @memberof Profile
    */
   public tagLine: string
    
}