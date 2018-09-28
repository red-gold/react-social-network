import { BaseDomain } from '../common'

export class Vote extends BaseDomain {

    /**
     * Post identifire which vote on
     */
    public postId: string

    /**
     * Vote date
     */
   public creationDate: number
 
    /**
     * Voter full name
     */
   public userDisplayName: string
 
    /**
     * Avatar of voter
     */
   public userAvatar: string
 
    /**
     * Voter identifier
     */
   public userId: string
 
   /**
    * The identifier of the user who receive the vote
    */
   public receiverId: string 

}
