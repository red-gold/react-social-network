import { Image } from 'core/domain/imageGallery'
import {Map, Collection, List} from 'immutable'

export interface IImageGalleryComponentProps {

  /**
   * Select image from image gallery
   */
  set: (URL: string) => void

  /**
   * Delete an image
   */
  deleteImage?: (imageId: string, fileName: string) => void

  /**
   * Upload image to the server
   */
  uploadImage?: (image: any, imageName: string) => any

  /**
   * Close image gallery
   */
  close: () => void

  /**
   * Load image list data
   */
  loadData: () => void

  /**
   * Folder name
   */
  folder: string

  /**
   * List of image in image gallery
   */
  images?: List<Map<string, any>>

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * File progress state
   */
  progress?: Map<string, any>

  /**
   * Temperory adding images
   */
  tempAddImages?: (uid: string, imageIds: Map<string, boolean>) => any

  /**
   * Temperory adding images to list
   */
  tempAddImageToList?: (entities: Map<string, any>) => any,
  uid?: string
}
