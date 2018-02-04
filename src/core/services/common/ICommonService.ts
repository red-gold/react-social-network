import { User } from 'core/domain/users'
import { Feed } from 'core/domain/common'

/**
 * Common service interface
 *
 * @export
 * @interface ICommonService
 */
export interface ICommonService {

  /**
   * Post feedback
   */
  addFeed: (feed: Feed) => Promise<string>
}
