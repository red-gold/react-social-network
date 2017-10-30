import { Image } from 'core/domain/imageGallery'

export interface IImageGalleryComponentProps {

  /**
   * Select image from image gallery
   *
   * @type {(URL: string,fullPath: string)}
   * @memberof IImageGalleryComponentProps
   */
  set?: (URL: string,fullPath: string) => void

  /**
   * Delete an image
   *
   * @memberof IImageGalleryComponentProps
   */
  deleteImage?: (imageId: string) => void

  /**
   * Save image in image gallery
   *
   * @memberof IImageGalleryComponentProps
   */
  saveImageGallery?: (URL: string,fullPath: string) => void

  /**
   * Change progress state
   *
   * @memberof IImageGalleryComponentProps
   */
  progressChange?: (percentage: number, status: boolean) => void

  /**
   * Close image gallery
   *
   * @memberof IImageGalleryComponentProps
   */
  close?: () => void

  /**
   * List of image in image gallery
   *
   * @type {Image[]}
   * @memberof IImageGalleryComponentProps
   */
  images?: Image[]
}
