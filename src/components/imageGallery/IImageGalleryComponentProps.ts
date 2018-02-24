import { Image } from 'core/domain/imageGallery'

export interface IImageGalleryComponentProps {

  /**
   * Select image from image gallery
   *
   * @type {(URL: string,fullPath: string)}
   * @memberof IImageGalleryComponentProps
   */
  set: (URL: string,fullPath: string) => void

  /**
   * Delete an image
   *
   * @memberof IImageGalleryComponentProps
   */
  deleteImage?: (imageId: string) => void

  /**
   * Upload image to the server
   *
   * @memberof IImageGalleryComponentProps
   */
  uploadImage?: (image: any, imageName: string) => any

  /**
   * Close image gallery
   *
   * @memberof IImageGalleryComponentProps
   */
  close: () => void

  /**
   * List of image in image gallery
   *
   * @type {Image[]}
   * @memberof IImageGalleryComponentProps
   */
  images?: Image[]

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
