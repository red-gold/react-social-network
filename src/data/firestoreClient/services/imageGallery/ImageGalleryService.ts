import { FileResult } from 'models/files/fileResult'
// - Import react components
import { firebaseRef, firebaseAuth, storageRef, db } from 'data/firestoreClient'

import { SocialError } from 'core/domain/common'
import { IImageGalleryService } from 'core/services/imageGallery'
import { Image } from 'core/domain/imageGallery'
import { IStorageService } from 'core/services/files'
import { IServiceProvider, ServiceProvide } from 'core/factories'
import { injectable } from 'inversify'

/**
 * Firbase image gallery service
 *
 * @export
 * @class ImageGalleryService
 * @implements {IImageGalleryService}
 */
@injectable()
export class ImageGalleryService implements IImageGalleryService {

  private readonly storageService: IStorageService
  private readonly serviceProvider: IServiceProvider

  constructor () {
    this.serviceProvider = new ServiceProvide()
    this.storageService = this.serviceProvider.createStorageService()
  }

  public getImageGallery: (userId: string)
    => Promise<Image[]> = (userId) => {
      return new Promise<Image[]>((resolve,reject) => {
        let imagesRef = db.doc(`users/${userId}`).collection(`images`)

        imagesRef.get().then((snapshot) => {
          let parsedData: Image[] = []
          snapshot.forEach((result) => {
            parsedData.push({
              id: result.id,
              ...result.data() as Image
            })
          })
          resolve(parsedData)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public saveImage: (userId: string, image: Image)
    => Promise<string> = (userId, image) => {
      return new Promise<string>((resolve,reject) => {

        let imageRef = db.doc(`users/${userId}`).collection(`images`).add(image)
        imageRef.then((result) => {
          resolve(result.id!)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public deleteImage: (userId: string, imageId: string)
    => Promise<void> = (userId, imageId) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const imageRef = db.doc(`users/${userId}/images/${imageId}`)

        batch.delete(imageRef)
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public uploadImage: (image: any, imageName: string, progressCallback: (percentage: number, status: boolean) => void)
    => Promise<FileResult> = (image, imageName, progressCallback) => {
      return new Promise<FileResult>((resolve,reject) => {
        this.storageService.uploadFile(image,imageName,progressCallback)
        .then((result: FileResult) => {
          resolve(result)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })
      })
    }

  public downloadImage: (fileName: string)
    => Promise<string> = (fileName) => {
      return new Promise<string>((resolve,reject) => {

        // Create a reference to the file we want to download
        let starsRef: any = storageRef.child(`images/${fileName}`)

        // Get the download URL
        starsRef.getDownloadURL().then((url: string) => {
          resolve(url)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })
      })
    }
}
