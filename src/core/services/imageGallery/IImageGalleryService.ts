import { FileResult } from 'models/files/fileResult'
import { User } from 'core/domain/users'
import { Image } from 'core/domain/imageGallery'

/**
 * Image gallery service interface
 *
 * @export
 * @interface IImageGalleryService
 */
export interface IImageGalleryService {
  getImageGallery: (userId: string) => Promise<Image[]>
  saveImage: (userId: string, image: Image) => Promise<string>
  deleteImage: (userId: string, imageId: string) => Promise<void>
  uploadImage: (file: any, fileName: string, progressCallback: (percentage: number, status: boolean) => void) => Promise<FileResult>
  downloadImage: (fileName: string) => Promise<string>
}
