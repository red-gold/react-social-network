import { Post } from 'src/core/domain/posts'
import { User } from 'core/domain/users'
import {Map, List} from 'immutable'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export interface IPhotoStreamProps {

  /**
   * Router match
   */
  match?: any
  
  /**
   * Theme
   */
  history?: any
  
  /**
   * Router match
   */
  location?: any

  /**
   * Stream request id
   */
  requestId?: string

  /**
   * The tile of top bar
   */
  homeTitle?: string

  /**
   * Delete image
   */
  deleteImage?: (fileId: string, fileName: string) => any

  /**
   * Handle delete image
   */
  onDelete?: (fileId: string) => void

  /**
   * Current user
   */
  currentUser?: User

  /**
   * Current album
   */
  currentAlbum: Post

  /**
   * Load the data 
   */
  loadPhotos?: (page: number) => any

  /**
   * If there is more post {true} or not {false}
   */
  hasMorePhotos?: boolean

  /**
   * Posts for stream
   */
  images: any[]

  /**
   * Translate to locale string
   */
  t?: (state: any, params?: {}) => any

  /**
   * Styles
   */
  classes?: any
}
