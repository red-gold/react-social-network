// - Import react components
import { firebaseRef, firebaseAuth, storageRef } from 'app/firebase/'

import { SocialError } from 'domain/common'
import { IImageGalleryService } from 'services/imageGallery'
import { Image } from 'domain/imageGallery'

/**
 * Firbase image gallery service
 *
 * @export
 * @class ImageGalleryService
 * @implements {IImageGalleryService}
 */
export class ImageGalleryService implements IImageGalleryService {

  public getImageGallery: (userId: string)
    => Promise<Image[]> = (userId) => {
      return new Promise<Image[]>((resolve,reject) => {
        let imagesRef: any = firebaseRef.child(`userFiles/${userId}/files/images`)

        imagesRef.once('value').then((snapshot: any) => {
          let images = snapshot.val() || {}
          let parsedImages: Image[] = []
          Object.keys(images).forEach((imageId) => {
            parsedImages.push({
              id: imageId,
              ...images[imageId]
            })
          })
          resolve(parsedImages)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public saveImage: (userId: string, image: Image)
    => Promise<string> = (userId, image) => {
      return new Promise<string>((resolve,reject) => {

        let imageRef = firebaseRef.child(`userFiles/${userId}/files/images`).push(image)
        imageRef.then(() => {
          resolve(imageRef.key!)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public deleteImage: (userId: string, imageId: string)
    => Promise<void> = (userId, imageId) => {
      return new Promise<void>((resolve,reject) => {

        let updates: any = {}
        updates[`userFiles/${userId}/files/images/${imageId}`] = null

        firebaseRef.update(updates).then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code, error.message))
        })

      })
    }

  public uploadImage: (file: any, fileName: string, progressCallback: Function)
    => Promise<void> = (file, fileName, progressCallback) => {
      return new Promise<void>((resolve,reject) => {

        let storegeFile: any = storageRef.child(`images/${fileName}`)

            // Upload file
        let task: any = storegeFile.put(file)

            // Upload storage bar
        task.on('state_changed', (snapshot: any) => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          progressCallback(percentage)

        }, (error: any) => {
          reject(new SocialError(error.code, error.message))
        }, () => {
          resolve()
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
