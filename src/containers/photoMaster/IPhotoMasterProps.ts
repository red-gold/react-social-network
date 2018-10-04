import { Post } from 'src/core/domain/posts'
import { Map, List } from 'immutable'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { User } from 'core/domain/users'

export interface IPhotoMasterProps {

  /**
   * The tile of top bar
   */
  homeTitle?: string

  /**
   * Set home title
   */
  setHomeTitle?: (homeTitle: string) => void

  /**
   * Open album
   */
  openAlbum?: () => any

  /**
   * Close album
   */
  closeAlbum?: () => any

  /**
   * User full name
   */
  fullName?: string

  /**
   * User avatar URL
   */
  avatar?: string

  /**
   * Load the data for stream
   */
  loadImages?: () => any

  /**
   * Load album
   */
  loadAlbum?: () => any

  /**
   * Update album post
   */
  updateAlbum?: (post: Post, callBack: Function) => any

  /**
   * Current album
   */
  currentAlbum?: Post

  /**
   * Upload image
   */
  uploadImage?: (image: any, imageName: string) => any

  /**
   * Delete album
   */
  deleteAlbum?: (albumId: string) => any

  /**
   * Progress change
   */
  progress?: Map<string, any>

  /**
   * Whether album dialog is open
   */
  albumDialogOpen?: boolean

  /**
   * If there is more post {true} or not {false}
   */
  hasMoreImages?: boolean

  /**
   * Posts for stream
   */
  images: any[]

  /**
   * Stream request id
   */
  requestId?: string

  /**
   * Router match property
   */
  match?: any

  /**
   * Whether current user is owner of current album
   */
  isOwner?: boolean

  streamRequestStatus?: ServerRequestStatusType

  /**
   * Current user
   */
  currentUser?: User

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Styles
   */
  classes?: any
}
