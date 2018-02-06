import { UserTie } from 'core/domain/circles'

export interface IFollowingComponentProps {

  followingUsers?: {[userId: string]: UserTie}

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
