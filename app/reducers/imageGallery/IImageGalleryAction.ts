import { ImageGalleryActionType } from 'constants/imageGalleryActionType'

/**
 *  ImageGallery action interface
 *
 * @export
 * @interface IImageGalleryAction
 */
export interface IImageGalleryAction {
  payload: any,
  type: ImageGalleryActionType

}