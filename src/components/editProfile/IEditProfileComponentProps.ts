import { User } from 'core/domain/users'
import {Map, List} from 'immutable'

export interface IEditProfileComponentProps {

  /**
   * User profile
   */
  info?: User

  /**
   * User profile banner addresss
   */
  banner: string

  /**
   * User avatar address
   */
  avatar: string

  /**
   * User full name
   */
  fullName: string

  /**
   * Edit profile dialog is open {true} or not {false}
   */
  open?: boolean

  /**
   * Update user profile
   */
  update?: (profile: User) => void

  /**
   * Upload avatar
   */
  uploadAvatar?: (image: any, imageName: string) => any

  /**
   * Upload cover
   */
  uploadCover?: (image: any, imageName: string) => any

  /**
   * Avatar list
   */
  avatarImages?: List<Map<string, any>>

  /**
   * Cover list
   */
  coverImages?: List<Map<string, any>>

  /**
   * Load avatar list
   */
  loadAvatarList?: (userId: string) => any

  /**
   * Load cover list
   */
  loadCoverList?: (userId: string) => any

  /**
   * On edit profile dialog close event
   */
  onRequestClose?: () => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Current locale language
   */
  currentLanguage?: string
}
