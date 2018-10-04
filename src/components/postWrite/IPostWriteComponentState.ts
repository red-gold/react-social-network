import { PostType } from 'core/domain/posts/postType'
import { UserPermissionType } from 'core/domain/common/userPermissionType'
import { Album } from 'core/domain/imageGallery/album'
import {Map} from 'immutable'

export interface IPostWriteComponentState {

  /**
   * Post text
   */
  postText: string
  /**
   * The URL image of the post
   */
  image?: string
  /**
   * The URL video of the post
   */
  video?: string
  /**
   * The address of video thumbnails on the post
   */
  videoThumbnails?: string
  /**
   * The path identifier of image on the server
   */
  imageFullPath: string
  /**
   * If it's true gallery will be open
   */
  galleryOpen: boolean
  /**
   * If it's true post button will be disabled
   */
  disabledPost: boolean
  /**
   * If it's true comment will be disabled on post
   */
  disableComments: boolean
  /**
   * If it's true share will be disabled on post
   */
  disableSharing: boolean

  /**
   * Whether menu is open
   */
  menuOpen: boolean

  /**
   * Whether video dialog is open
   */
  videoLinkOpen: boolean

  /**
   * Whether video gallery dialog is open
   */
  videoGalleryOpen: boolean

  /**
   * Whether video gallery dialog is open
   */
  permissionOpen: boolean

  /**
   * Post content type 
   */
  postType: PostType

  /**
   * Album data
   */
  album: Map<string, any>,

  /**
   * Selected photos
   */
  selectedPhotos: { src: string, fileName: string }[]

  /**
   * The list of user can access to post
   */
  accessUserList: Array<string>

  /**
   * User permission type
   */
  permission: UserPermissionType

  /**
   * Menu anchor element
   */
  menuAnchorEl?: any
}
