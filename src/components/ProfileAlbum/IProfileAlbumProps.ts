import { Post } from 'src/core/domain/posts'
import { User } from 'core/domain/users'
import { Map } from 'immutable'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { List } from 'immutable'

export interface IProfileAlbumProps {

  /**
   * Theme
   */
  history?: any

  /**
   * Router match
   */
  location?: any

  /**
   * Upload image
   */
  uploadImage?: (image: any, imageName: string) => any

  /**
   * Open album
   */
  openAlbum?: () => any

  /**
   * Close album
   */
  closeAlbum?: () => any

  /**
   * Whether album dialog is open
   */
  albumDialogOpen?: boolean

  /**
   * Whether the current user is owner
   */
  isOwner: boolean 

  /**
   * Whether has more album
   */
  hasMoreAlbum?: boolean 

  /**
   * Album posts
   */
  posts?: List<Map<string, any>>

  /**
   * Progress change
   */
  progress?: Map<string, any>

  /**
   * The user identifier of current profile
   */
  userId: string

  /**
   * Current page
   */
  page?: number

  /**
   * Translate to locale string
   */
  increasePage?: () => any

  /**
   * Load albums
   */
  loadAlbums?: (userId: string, page: number) => any

  /**
   * Current user
   */
  currentUser?: User

  /**
   * Translate to locale string
   */
  t?: (state: any, params?: {}) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Theme
   */
  theme?: any
}
