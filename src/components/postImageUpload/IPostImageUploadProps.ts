import { Image } from 'core/domain/imageGallery'
import {Map, Collection, List} from 'immutable'
import { Post } from 'core/domain/posts/post'
import { User } from 'core/domain/users'
import { Photo } from 'core/domain/imageGallery/photo'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export interface IPostImageUploadProps {

  /**
   * Upload image to the server
   */
  uploadImage?: (image: any, imageName: string) => any

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
  photos: {src: string, fileName: string}[]

  /**
   * Create album request
   */
  createAlbumRequestStatus?: ServerRequestStatusType

  /**
   * Handle delete file
   */
  onDelete: (fileName: string) => void

  /**
   * Current user information
   */
  currentUser?: User

  /**
   * Current album to edit
   */
  currentAlbum?: Post

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
