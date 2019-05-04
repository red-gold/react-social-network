import { User } from 'core/domain/users';

import { FeedType } from './feedType';

export class Feed {

  /**
   * Constructor
   */
  constructor (
    /**
     * Feed identifier
     */
  public id?: string,

  /**
   * Feed text
   */
  public text?: string,

  /**
   * Feed type
   */
  public feedType?: FeedType,

  /**
   * The user who send the feedback
   */
  public user?: User

    ) {
  }

}
