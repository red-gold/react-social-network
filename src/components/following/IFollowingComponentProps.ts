import { UserFollower } from 'core/domain/circles'

export interface IFollowingComponentProps {

  followingUsers?: {[userId: string]: UserFollower}
}
