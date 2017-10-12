import { User, Profile } from 'domain/users'

/**
 * User service interface
 *
 * @export
 * @interface IUserService
 */
export interface IUserService {
  getUserProfile: (userId: string) => Promise<Profile>
  updateUserProfile: (userId: string, profile: Profile) => Promise<void>
  getUsersProfile: (userId: string) => Promise<{[userId: string]: Profile}>
}
