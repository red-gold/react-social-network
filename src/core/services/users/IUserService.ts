import { User, Profile } from 'core/domain/users'

/**
 * User service interface
 *
 * @export
 * @interface IUserService
 */
export interface IUserService {
  getUserProfile: (userId: string) => Promise<Profile>
  updateUserProfile: (userId: string, profile: Profile) => Promise<void>
  getUsersProfile: (userId: string, lastUserId?: string, page?: number, limit?: number)
  => Promise<{ users: { [userId: string]: Profile }[], newLastUserId: string }>
}
