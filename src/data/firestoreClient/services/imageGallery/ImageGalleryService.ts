import CommonAPI from 'api/CommonAPI';
import { SocialError } from 'core/domain/common';
import { FileGallery, Image } from 'core/domain/imageGallery';
import { Photo } from 'core/domain/imageGallery/photo';
import { Post } from 'core/domain/posts/post';
import { IStorageService } from 'core/services/files';
import { IImageGalleryService } from 'core/services/imageGallery';
import { db, storageRef } from 'data/firestoreClient';
import { fromJS, Map } from 'immutable';
import { injectable } from 'inversify';
import { FileResult } from 'models/files/fileResult';
import { IServiceProvider } from 'src/core/factories/IServiceProvider';
import { ServiceProvide } from 'src/core/factories/serviceProvide';

// - Import react components
/**
 * Firbase image gallery service
 */
@injectable()
export class ImageGalleryService implements IImageGalleryService {

  private readonly storageService: IStorageService
  private readonly serviceProvider: IServiceProvider

  constructor() {
    this.serviceProvider = new ServiceProvide()
    this.storageService = this.serviceProvider.createStorageService()
    this.uploadFile = this.uploadFile.bind(this)
  }

  /**
   * Get gallery
   */
  public getGallery: (userId: string, folderName: string)
    => Promise<Image[]> = (userId, folderName) => {
      return new Promise<Image[]>((resolve, reject) => {
        let imagesRef = db.doc(`users/${userId}`).collection(folderName)

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

  /**
   * Save images' information
   */
  public saveImages = async (userId: string, folderName: string, photos: Photo[]) => {
    const photoAlbumRef = db.collection(`users`).doc(userId).collection(folderName)
    const savedPhotos: Photo[] = []
    const batch = db.batch()
    photos.forEach((photo) => {
      const photoRef = photoAlbumRef.doc()
      const photoEntity = { ...CommonAPI.removeNil(photo), id: photoRef.id }
      batch.set(photoRef, photoEntity)
      savedPhotos.push(photoEntity)
    })
    await batch.commit()
    return savedPhotos
  }

  /**
   * update images' information
   */
  public updateImages = async (userId: string, folderName: string, photos: Photo[]) => {
    const photoAlbumRef = db.collection(`users`).doc(userId).collection(folderName)
    const savedPhotos: Photo[] = []
    const batch = db.batch()
    photos.forEach((photo) => {
      const photoRef = photoAlbumRef.doc(photo.id)
      const photoEntity = { ...CommonAPI.removeNil(photo), id: photoRef.id }
      batch.set(photoRef, photoEntity)
      savedPhotos.push(photoEntity)
    })
    await batch.commit()
    return savedPhotos
  }

  /**
   * Create an album
   */
  public setPhotoAlbum = async (userId: string, folderName: string, albumPost: Post, images: Photo[]) => {
    const photoAlbumRef = db.collection(`users`).doc(userId).collection(folderName)
    let postRef = db.collection(`posts`).doc()
    if (albumPost.id !== '0') {
      postRef = db.collection(`posts`).doc(albumPost.id!)
    }
    const newAlbum = { ...albumPost, id: postRef.id }
    const postAlbum$ = postRef.set(newAlbum)
    const batch = db.batch()
    images.forEach((image) => {
      image.albumId = postRef.id
      const photoRef = photoAlbumRef.doc(image.id)
      batch.set(photoRef, {
        albumId: postRef.id,
        albumName: albumPost.album!.title,
        permission: albumPost.permission,
        accessUserList: albumPost.accessUserList
      }, {merge: true})
    })
    
    const imagesBatch$ = batch.commit()
     await Promise.all([postAlbum$, imagesBatch$])
    let imageIds: Map<string, boolean> = Map({})
    let mappedImages: Map<string, any> = Map({})
    images.forEach((image) => {
      const mappedImage = fromJS({...image})
      mappedImages = mappedImages.set(image.id, mappedImage)
      
      imageIds = imageIds.set(image.id, true)
    })
    return { newAlbum: fromJS(newAlbum), imageIds, images: mappedImages }
  }

  /**
   * Fetch album images
   */
  public fetchAlbumImages = async (userId: string, albumId: string, limit: number = 10, lastPhotoId?: string) => {
    let imagesRef = db.collection('users').doc(userId)
      .collection('images')
      .where('albumId', '==', albumId)
    if (lastPhotoId && lastPhotoId !== '') {
      imagesRef = imagesRef.orderBy('id').orderBy('creationDate', 'desc').startAfter(lastPhotoId)
    }

    if (limit) {
      imagesRef = imagesRef.limit(limit)
    }

    const images = await imagesRef.get()
    let mappedImages = Map({})
    let newLastImageId = images.size > 0 ? images.docs[images.docs.length - 1].id : ''
    let imageIds: Map<string, boolean> = Map({})
    images.forEach((imageDoc) => {
      const image = imageDoc.data()
      mappedImages = mappedImages.set(imageDoc.id, fromJS(image))
      imageIds = imageIds.set(imageDoc.id, true)
    })

    return { mappedImages, ids: imageIds, newLastImageId }
  }

  /**
   * Save file
   */
  public saveFile = async <T extends FileGallery>(userId: string, file: T, folderName: string) => {

    let imageRef = db.doc(`users/${userId}`).collection(folderName)
    try {
      const result = await imageRef.add(file)
      return result.id!

    } catch (error) {
      throw new SocialError(error.code, error.message)
    }

  }

  /**
   * Delte image file
   */
  public deleteImage = async (folderName: string, fileName: string) => {
    await this.storageService.deleteFile(folderName, fileName)
  }

  /**
   * Delete file
   */
  public deleteFile: (userId: string, imageId: string, folderName: string)
    => Promise<void> = (userId, imageId, folderName) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const imageRef = db.doc(`users/${userId}/${folderName}/${imageId}`)

        batch.delete(imageRef)
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })

      })
    }

  /**
   * Upload file
   */
  public uploadFile: (folderName: string, file: any, fileName: string,
    onProgress: (percentage: number, status: boolean, fileName: string) => void,
    onSuccess: (fileResult: FileResult) => void,
    onFailure: (error: any) => void) => void =
    (folderName, file, fileName, onProgress, onSuccess, onFailure) => {
      this.storageService.uploadFile(folderName, file, fileName, onProgress, onSuccess, onFailure)
    }

  /**
   * Download file
   */
  public downloadFile: (fileName: string, folderName: string)
    => Promise<string> = (fileName, folderName) => {
      return new Promise<string>((resolve, reject) => {

        // Create a reference to the file we want to download
        let starsRef: any = storageRef.child(`${folderName}/${fileName}`)

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
