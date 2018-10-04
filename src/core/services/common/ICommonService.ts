import { User } from 'core/domain/users'
import { Feed } from 'core/domain/common'
import {Map} from 'immutable'

/**
 * Common service interface
 */
export interface ICommonService {

  /**
   * Get twitter media
   */
  getTwitterMedia: (accessToken: string) => Promise<Map<string, any>>

  /**
   * Post feedback
   */
  addFeed: (feed: Feed) => Promise<string>
}
