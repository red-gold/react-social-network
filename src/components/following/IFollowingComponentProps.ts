import { UserTie } from 'core/domain/circles'

export interface IFollowingComponentProps {

  followingUsers?: {[userId: string]: UserTie}
}
