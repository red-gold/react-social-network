import { UserPermissionType } from 'core/domain/common/userPermissionType'
import { User } from 'core/domain/users'

export interface IUserPermissionProps {

  /**
   * Whether add video modal is open
   */
  open: boolean

  /**
   * Handle close add video modal
   */
  onClose: any

  /**
   * On Adding user accecc list
   */
  onAddAccessList: (accessList: string[], selectedAccess: UserPermissionType) => void

  /**
   * User following search filter
   */
  followingIds?: string[]

  /**
   * Current user
   */
  currentUser?: User

  /**
   * Default permission
   */
  access: UserPermissionType

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

}
