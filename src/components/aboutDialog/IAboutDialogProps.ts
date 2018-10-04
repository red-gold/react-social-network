import { Image } from 'core/domain/imageGallery'
import {Map, Collection, List} from 'immutable'
import { Post } from 'core/domain/posts/post'
import { User } from 'core/domain/users'
import { Photo } from 'core/domain/imageGallery/photo'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export interface IAboutDialogProps {

  /**
   * Whether dialog is open
   */
  open: boolean

  /**
   * Close image gallery
   */
  onClose: () => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Theme
   */
  theme?: any

  /**
   * Current user information
   */
  currentUser?: User

  /**
   * The user to show about
   */
  targetUser: User

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Current language code
   */
  currentLanguage?: string 
}
