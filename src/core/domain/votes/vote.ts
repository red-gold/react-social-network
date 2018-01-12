import { BaseDomain } from 'core/domain/common'

export class Vote extends BaseDomain {

    /**
     * Post identifire which vote on
     *
     * @type {string}
     * @memberof Vote
     */
  public postId: string

   /**
    * Vote date
    *
    * @type {number}
    * @memberof Vote
    */
  public creationDate: number

   /**
    * Voter full name
    *
    * @type {string}
    * @memberof Vote
    */
  public userDisplayName: string

   /**
    * Avatar of voter
    *
    * @type {string}
    * @memberof Vote
    */
  public userAvatar: string

   /**
    * Voter identifier
    *
    * @type {string}
    * @memberof Vote
    */
  public userId: string

}
