import { Image } from 'core/domain/imageGallery'
import {Map, Collection, List} from 'immutable'
import { Post } from 'core/domain/posts/post'
import { User } from 'core/domain/users'
import { Photo } from 'core/domain/imageGallery/photo'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export interface IAlbumDialogProps {

  /**
   * Upload image to the server
   */
  uploadImage?: (image: any, imageName: string) => any

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
   * File progress state
   */
  progress: Map<string, any>

  /**
   * Selected photos
   */
  photos: {file: any, fileName: string}[]

  /**
   * Create album request
   */
  createAlbumRequestStatus?: ServerRequestStatusType

  /**
   * Current user information
   */
  currentUser?: User

  /**
   * Current album to edit
   */
  currentAlbum?: Post

  /**
   * Create post
   */
  post?: (albumPost: Post, images: Photo[]) => any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
