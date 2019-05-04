// - Import react componetns
import { ImageGalleryActionType } from 'constants/imageGalleryActionType';
import { Photo } from 'core/domain/imageGallery/photo';
import { Post } from 'core/domain/posts';
import { Map } from 'immutable';
import moment from 'moment/moment';
import config from 'src/config';
import { SocialError } from 'src/core/domain/common';
import { Image, VideoFile } from 'src/core/domain/imageGallery';
import { IImageGalleryService } from 'src/core/services/imageGallery';
import { SocialProviderTypes } from 'src/core/socialProviderTypes';
import { provider } from 'src/socialEngine';
import * as globalActions from 'store/actions/globalActions';

// - Import domain
// - Import action types
// - Import actions
/**
 * Get service providers
 */
const imageGalleryService: IImageGalleryService = provider.get<IImageGalleryService>(SocialProviderTypes.ImageGalleryService)

/* _____________ UI Actions _____________ */

/**
 * Fetch images for image gallery
 */
export const dbGetImageGallery = () => {
  return {
    type: ImageGalleryActionType.DB_FETCH_IMAGE_GALLERY
  }
}

/**
 * Fetch video for video gallery
 */
export const dbGetVideoGallery = () => {
  return {
    type: ImageGalleryActionType.DB_FETCH_VIDEO_GALLERY
  }
}

/**
 * Upload video on server
 */
export const dbUploadVideo = (file: any, fileName: string, videoThumbnails: Blob) => {
  return { type: ImageGalleryActionType.DB_UPLOAD_VIDEO,payload: {file, fileName, videoThumbnails} }
}

/**
 * Delete video on server
 */
export const dbDeletedVideo = (videoId: string) => {
  return { type: ImageGalleryActionType.DB_DELETE_VIDEO,payload: {videoId} }
}

/* _____________ CRUD Database_____________ */

/**
 * Save image URL in the server
 */
export const dbSaveImage = (imageURL: string) => {
  return (dispatch: any, getState: Function) => {

    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    let image: Image = {
      creationDate: moment.utc().valueOf(),
      deleteDate: '',
      URL: imageURL,
      ownerUserId: uid,
      lastEditDate: 0,
      deleted: false
    }
    return imageGalleryService.saveFile(uid,image, config.data.imageFolderPath)
      .then((imageKey: string) => {
        dispatch(addImage({
          ...image,
          id: imageKey
        }))
      })
      .catch((error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
      })
  }
}

/**
 * Delete an image from database
 */
export const dbDeleteImage = (fileId: string, folderName: string, fileName: string) => {
  return {
    type: ImageGalleryActionType.DB_DELETE_IMAGE,
    payload: {fileId, folderName, fileName}
  }

}

/**
 * Upload image on the server
 */
export const dbUploadImage = (file: any, fileName: string) => {
  return {
    type: ImageGalleryActionType.DB_UPLOAD_IMAGE,
    payload: {file, fileName}
  }
}

/**
 * Upload avatar on the server
 */
export const dbUploadAvatar = (file: any, fileName: string) => {
  return {
    type: ImageGalleryActionType.DB_UPLOAD_AVATAR,
    payload: {file, fileName}
  }
}

/**
 * Upload cover on the server
 */
export const dbUploadCover = (file: any, fileName: string) => {
  return {
    type: ImageGalleryActionType.DB_UPLOAD_COVER,
    payload: {file, fileName}
  }
}

/**
 * Download image from server
 */
export const dbDownloadImage = (fileName: string) => {

  return (dispatch: any, getState: Function) => {
    if (fileName === 'noImage') {
      return {}
    }
    if (getState().imageGallery.imageURLList[fileName] && fileName !== '') {
      return undefined
    }
    if (getState().imageGallery.imageRequests.indexOf(fileName) > -1) {
      return undefined
    }
    dispatch(sendImageRequest(fileName))

    return imageGalleryService.downloadFile(fileName, config.data.imageFolderPath)
      .then((url: string) => {
      // Insert url into an <img> tag to 'download'
        if (!getState().imageGallery.imageURLList[fileName] || fileName === '') {
          dispatch(setImageURL(fileName, url))
        }
      })
    .catch((error: SocialError) => {
      dispatch(globalActions.showMessage(error.message))
    })
  }
}

/**
 * Fetch album images
 */
export const dbFetchAlbumImages = (userId: string, albumId: string) => {
  return { type: ImageGalleryActionType.DB_FETCH_ALBUM_IMAGES, payload: {userId, albumId} }
}

/**
 * Fetch avatar images
 */
export const dbFetchAvatarImages = (userId: string) => {
  return { type: ImageGalleryActionType.DB_FETCH_AVATAR_IMAGES, payload: {userId} }
}

/**
 * Fetch cover images
 */
export const dbFetchCoverImages = (userId: string) => {
  return { type: ImageGalleryActionType.DB_FETCH_COVER_IMAGES, payload: {userId} }
}

/* _____________ CRUD State _____________ */

/**
 * Add image list to image gallery
 */
export const addImageList = (entities: Map<string, any>) => {
  return { type: ImageGalleryActionType.ADD_IMAGE_LIST,payload: {entities} }
}

/**
 * Add album list
 */
export const addAlbumIds = (albumIds: string[]) => {
  return { type: ImageGalleryActionType.ADD_ALBUM_ID_LIST,payload: {albumIds} }
}

/**
 * Add album image list id
 */
export const addAlbumImages = (albumId: string, imageIds: Map<string, boolean>) => {
  return { type: ImageGalleryActionType.ADD_ALBUM_IMAGE_LIST,payload: {albumId, imageIds} }
}

/**
 * Add avatar image
 */
export const addAvatarImages = (userId: string, imageIds: Map<string, boolean>) => {
  return { type: ImageGalleryActionType.ADD_AVATAR_IMAGE_LIST,payload: {imageIds, userId} }
}

/**
 * Add cover image 
 */
export const addCoverImages = (userId: string, imageIds: Map<string, boolean>) => {
  return { type: ImageGalleryActionType.ADD_COVER_IMAGE_LIST,payload: {imageIds, userId} }
}

/**
 * Create album on server
 */
export const dbCreateAlbum = (albumPost: Post ,images: Photo[]) => {
  return { 
    type: ImageGalleryActionType.DB_CREATE_ALBUM, 
    payload: {albumPost, images} 
  }
}

/**
 * Add image to gallery
 */
export const addImage = (image: Image) => {
  return { type: ImageGalleryActionType.ADD_IMAGE, payload: {image} }
}

/**
 * Set album has more image
 */
export const albumHasMoreImage = (albumId: string) => {
  return { 
    type: ImageGalleryActionType.HAS_MORE_DATA_ALBUM_IMAGE,
    payload: {albumId}
   }
}

/**
 * Set album has no more image
 */
export const albumHasNoMoreImage = (albumId: string) => {
  return { 
    type: ImageGalleryActionType.NO_MORE_DATA_ALBUM_IMAGE,
    payload: {albumId}
  }
}

/**
 * Set album has no more image
 */
export const setLastAlbumImage = (albumId: string, imageId: string) => {
  return { 
    type: ImageGalleryActionType.LAST_ALBUM_IMAGE_ID,
    payload: {albumId, imageId}
  }
}

/**
 * Delete an image
 */
export const deleteImage = (imageId: string) => {
  return { type: ImageGalleryActionType.DELETE_IMAGE, payload: {imageId} }

}

/**
 * Delete an image
 */
export const setImageURL = (name: string, url: string) => {
  return {
    type: ImageGalleryActionType.SET_IMAGE_URL,
    payload: { name, url }
  }
}

/**
 * Add video to gallery
 */
export const addVideo = (video: VideoFile) => {
  return { type: ImageGalleryActionType.ADD_VIDEO_GALLERY, payload: video }
}

/**
 * Add vieo list to gallery
 */
export const addVideoList = (images: VideoFile[]) => {
  return { type: ImageGalleryActionType.ADD_VIDEO_LIST_GALLERY,payload: images }
}

/**
 * Delete a video
 */
export const deleteVideo = (id: string) => {
  return { type: ImageGalleryActionType.DELETE_VIDEO, payload: id }

}

/**
 * Clear all data in image gallery store
 */
export const clearAllData = () => {
  return {
    type: ImageGalleryActionType.CLEAT_ALL_DATA_IMAGE_GALLERY
  }
}

/**
 * Add uploading photo
 */
export const addUploadingPhoto = (photoId: string) => {
  return {
    type: ImageGalleryActionType.ADD_UPLOADING_PHOTO,
    payload: {photoId}
  }
}

/**
 * Delete uploading photo
 */
export const deleteUploadingPhoto = (photoId: string) => {
  return {
    type: ImageGalleryActionType.ADD_UPLOADING_PHOTO,
    payload: {photoId}
  }
}

/**
 * Clear uploading photo
 */
export const clearUploadingPhoto = () => {
  return {
    type: ImageGalleryActionType.CLEAR_UPLOADING_PHOTO
  }
}

/**
 * Send image request
 */
export const sendImageRequest = (name: string) => {
  return {
    type: ImageGalleryActionType.SEND_IMAGE_REQUEST,
    payload: name
  }

}
