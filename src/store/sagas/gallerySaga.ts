import { take, fork, select, put, call, cancelled, all, takeLatest, takeEvery } from 'redux-saga/effects'
import { Map, fromJS } from 'immutable'
import * as serverActions from 'store/actions/serverActions'
import { provider } from 'socialEngine'
import * as imageGalleryActions from 'store/actions/imageGalleryActions'
import * as globalActions from 'store/actions/globalActions'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { ImageGalleryActionType } from 'constants/imageGalleryActionType'
import { postSelector } from 'store/reducers/posts'
import { authorizeSelector } from 'store/reducers/authorize'
import { Post } from 'core/domain/posts'
import { PostAPI } from 'api/PostAPI'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { IImageGalleryService } from 'core/services/imageGallery/IImageGalleryService'
import config from 'src/config'
import { eventChannel, END } from 'redux-saga'
import { FileResult, FileResultStatus } from 'models/files'
import { SocialError } from 'core/domain/common'
import { VideoFile } from 'core/domain/imageGallery'
import moment from 'moment/moment'
import { IPostService } from 'core/services/posts/IPostService'
import { GalleryAPI } from 'api/GalleryAPI'
import { Photo } from 'core/domain/imageGallery/photo'
import { DialogType } from 'models/common/dialogType'
import * as postActions from 'store/actions/postActions'
import { userActions } from 'store/actions'
import { gallerySelector } from 'store/reducers/imageGallery/gallerySelector'
import { UserPermissionType } from 'core/domain/common/userPermissionType'

/**
 * Get service providers
 */
const galleryService: IImageGalleryService = provider.get<IImageGalleryService>(SocialProviderTypes.ImageGalleryService)
const postService: IPostService = provider.get<IPostService>(SocialProviderTypes.PostService)

/***************************** Subroutines ************************************/

/**
 * Creating channel event and subscribing upload storage service
 */
function createUploadChannel(file: any, fileName: string, folderName: string) {
  return eventChannel<FileResultStatus>((emmiter) => {
    const fileResultStatus = new FileResultStatus()
    const onProress = (percentage: number, status: boolean, fileName: string) => {
      fileResultStatus.progress = percentage
      fileResultStatus.fileName = fileName
      emmiter(fileResultStatus)
    }

    const onSuccess = (fileResult: FileResult, meta?: any) => {
      fileResultStatus.success = fileResult
      fileResultStatus.meta = meta
      emmiter(fileResultStatus)
      emmiter(END)
    }

    const onFailure = (error: SocialError) => {
      fileResultStatus.error = error
      emmiter(fileResultStatus)
      emmiter(END)
    }
    galleryService.uploadFile(folderName, file, fileName, onProress, onSuccess, onFailure)
    return () => {
    }
  })
}

/**
 * Fetch image gallery
 */
function* dbFetchImageGallery(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const images = yield call(galleryService.getGallery, uid, config.data.imageFolderPath)
      yield put(imageGalleryActions.addImageList(images))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Delete video from gallery on server
 */
function* dbDeleteVideo(videoId: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(galleryService.deleteFile, uid, videoId, config.data.videoFolderPath)
      yield put(imageGalleryActions.deleteVideo(videoId))

    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Delete image on server
 */
function* dbDeleteImage(fileId: string, folderName: string, fileName: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(galleryService.deleteImage, `${folderName}/${uid}`, fileName)
      yield put(imageGalleryActions.deleteImage(fileId))

    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Save video information on server
 */
function* dbSaveVideo(videoURL: string, videoThumbnails: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {

    let video: VideoFile = {
      creationDate: moment().unix(),
      deleteDate: '',
      URL: videoURL,
      videoThumbnails,
      ownerUserId: uid,
      lastEditDate: 0,
      deleted: false
    }
    const videoKey = yield call(galleryService.saveFile, uid, video, config.data.videoFolderPath)
    yield put(imageGalleryActions.addVideo({
      ...video,
      id: videoKey
    }))
  }
}

/**
 * Fetch video gallery
 */
function* dbUploadVideo(file: any, fileName: string, videoThumbnails: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {

    const folderName = `${config.data.videoFolderPath}/${uid}`
    const uploadFileChannel = yield call(createUploadChannel, file, fileName, folderName)

    while (true) {
      const { progress = 0, success, error } = yield take<FileResultStatus>(uploadFileChannel)
      if (error) {

        yield put(globalActions.showMessage(error.code))
        yield put(globalActions.progressChange(100, false))
        yield put(globalActions.hideTopLoading())
        return
      }

      if (success) {
        yield call(dbSaveVideo, success.fileURL, videoThumbnails)
        yield put(globalActions.progressChange(100, false))
        yield put(globalActions.hideTopLoading())
        return
      }

      yield put(globalActions.progressChange(progress, true))

    }
  }
}

/**
 * Fetch video gallery
 */
function* dbUploadVideoThumbnail(file: any, fileName: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {

    const folderName = `${config.data.videoThumbnailPath}/${uid}`
    const uploadFileChannel = yield call(createUploadChannel, file, fileName, folderName)

    while (true) {
      const { progress = 0, success, error } = yield take<FileResultStatus>(uploadFileChannel)
      if (error) {

        yield put(globalActions.showMessage(error.code))
        yield put(globalActions.progressChange(100, false))
        yield put(globalActions.hideTopLoading())
        return
      }

      if (success) {
        yield put(globalActions.progressChange(100, false))

        yield put(globalActions.hideTopLoading())

        return success
      }

      yield put(globalActions.progressChange(progress, true))

    }
  }
}

/**
 * Fetch video gallery
 */
function* dbFetchVideoGallery(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const videos = yield call(galleryService.getGallery, uid, config.data.videoFolderPath)
      yield put(imageGalleryActions.addVideoList(videos))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))
    }
  }
}

/**
 * Upload image
 */
function* dbUploadImage(file: any, rootName: string, fileName: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {

    const folderName = `${rootName}/${uid}`
    const uploadFileChannel = yield call(createUploadChannel, file, fileName, folderName)

    while (true) {
      const { progress = 0, success, error, meta } = yield take<FileResultStatus>(uploadFileChannel)
      if (error) {

        yield put(globalActions.showMessage(error.code))
        yield put(globalActions.progressChangeWithKey(100, false, fileName))
        yield put(globalActions.hideTopLoading())
        return
      }

      if (success) {
        yield put(globalActions.progressChangeWithKey(100, false, fileName, meta))

        yield put(globalActions.hideTopLoading())

        return success
      }

      yield put(globalActions.progressChangeWithKey(progress, true, fileName))

    }
  }
}

/**
 * Fetch album images 
 */
function* fetchAlbumImages(userId: string, albumId: string, lastImageId?: string, limit: number = 10) {

  const lastImage = yield select(gallerySelector.getAlbumLastImageId, {albumId})
 const result: {mappedImages: Map<string, any>, ids: Map<string, boolean>, newLastImageId: string} = 
 yield call(galleryService.fetchAlbumImages, userId, albumId, limit, lastImage)
 const imageCount = result.mappedImages.count()
 
 yield put(imageGalleryActions.setLastAlbumImage(albumId, result.newLastImageId))

 if (!(imageCount > (limit - 1))) {
   yield put(imageGalleryActions.albumHasNoMoreImage(albumId))
} 
if (imageCount > 0) {
  yield put(imageGalleryActions.addImageList(result.mappedImages))
  yield put(imageGalleryActions.addAlbumImages(albumId, result.ids ))
 }
}

/**
 * Fetch avatar images 
 */
function* fetchAvatarImages(userId: string, albumId: string, lastImageId?: string, limit: number = 10) {
 const result: {mappedImages: Map<string, any>, ids: Map<string, boolean>, newLastImageId: string} = yield call(galleryService.fetchAlbumImages, userId, albumId, limit)
 const imageCount = result.mappedImages.count()
 
 if (!(imageCount > (limit - 1))) {
  //  yield put(imageGalleryActions.albumHasNoMoreImage(albumId))
} 
if (imageCount > 0) {
  yield put(imageGalleryActions.addImageList(result.mappedImages))
  yield put(imageGalleryActions.addAvatarImages(userId, result.ids ))
 }
}

/**
 * Fetch cover images 
 */
function* fetchCoverImages(userId: string, albumId: string, lastImageId?: string, limit: number = 10) {
 const result: {mappedImages: Map<string, any>, ids: Map<string, boolean>, newLastImageId: string} = yield call(galleryService.fetchAlbumImages, userId, albumId, limit)
 const imageCount = result.mappedImages.count()
 
 if (!(imageCount > (limit - 1))) {
  //  yield put(imageGalleryActions.albumHasNoMoreImage(albumId))
} 
if (imageCount > 0) {
  yield put(imageGalleryActions.addImageList(result.mappedImages))
  yield put(imageGalleryActions.addCoverImages(userId, result.ids ))
 }
}

/**
 * Save album
 */
function* saveAlbum(uid: string, albumPost: Post, images: Photo[]) {

  const albumImages: {newAlbum: Map<string,any>, imageIds: Map<string, boolean> , images: Map<string,any>} = 
  yield call(galleryService.setPhotoAlbum, uid, config.data.imageFolderPath, albumPost, images)
  
  yield put(globalActions.closeDialog(DialogType.PostWrite))
  yield put(imageGalleryActions.addImageList(albumImages.images))
  yield put(postActions.addPost(albumImages.newAlbum))
  yield put(userActions.addProfileAlbums(uid, Map({[albumImages.newAlbum.get('id')]: true})))
  yield put(imageGalleryActions.addAlbumImages(albumImages.newAlbum.get('id'), albumImages.imageIds ))
  yield put(postActions.addStreamPosts(Map({[albumImages.newAlbum.get('id')]: true})))
  yield put(globalActions.closeDialog(DialogType.Album))
  const createAlbumRequest = GalleryAPI.createAlbumRequest(uid)
  createAlbumRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(createAlbumRequest))

}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

/**
 * Watch upload video
 */
function* watchUploadVideo(action: { type: ImageGalleryActionType, payload: any }) {
  const { file, fileName, videoThumbnails } = action.payload
  const prefix = 'thumbnail_'
  const thumbnailFileName = prefix + fileName
  const thumbnail = yield call(dbUploadVideoThumbnail, videoThumbnails, thumbnailFileName)

  yield call(dbUploadVideo, file, fileName, thumbnail.fileURL)
}

/**
 * Watch fetch album images
 */
function* watchFetchAlbumImages(action: { type: ImageGalleryActionType, payload: any }) {
  const { userId, albumId } = action.payload
  const lastImageId = yield select(gallerySelector.getAlbumLastImageId, {albumId})
  const images = yield call(fetchAlbumImages, userId, albumId, lastImageId, 10)
}

/**
 * Watch fetch avatar images
 */
function* watchFetchAvatarImages(action: { type: ImageGalleryActionType, payload: any }) {
  const { userId } = action.payload
  const lastImageId = '' // yield select(gallerySelector.getAlbumLastImageId, {albumId})
  const images = yield call(fetchAvatarImages, userId, 'avatar', lastImageId, 100)
}

/**
 * Watch fetch cover images
 */
function* watchFetchCoverImages(action: { type: ImageGalleryActionType, payload: any }) {
  const { userId } = action.payload
  const lastImageId = '' // yield select(gallerySelector.getAlbumLastImageId, {albumId})
  const images = yield call(fetchCoverImages, userId, 'cover', lastImageId, 100)
}

/**
 * Watch upload image
 */
function* watchUploadImage(action: { type: ImageGalleryActionType, payload: any }) {
  const { file, fileName } = action.payload
  yield call(dbUploadImage, file, config.data.imageFolderPath, fileName)
}

/**
 * Watch upload avatar
 */
function* watchUploadAvatar(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  const { file, fileName } = action.payload
  yield put(globalActions.showTopLoading())
  const result = yield call(dbUploadImage, file, config.data.avatarFolderPath, fileName)
  yield put(globalActions.hideTopLoading())
  const {fileURL} = result
  const fileId = (fileName as string).split('.')[0]
  const newAvatar = new Photo(
    fileId,
    fileName,
    '',
    fileURL,
    fileURL,
    uid,
    moment.utc().valueOf(),
    config.data.avatarFolderPath,
    config.data.avatarFolderPath,
    0,
    0,
    {},
    UserPermissionType.Public,
    []   
  )

  const mapImage = Map({[fileId]: fromJS({...newAvatar})})
  yield put(imageGalleryActions.addImageList(mapImage))
  yield put(imageGalleryActions.addAvatarImages(uid, Map({[fileId]: true})))

}

/**
 * Watch upload cover
 */
function* watchUploadCover(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  const { file, fileName } = action.payload
  yield put(globalActions.showTopLoading())
  const result = yield call(dbUploadImage, file, config.data.coverFolderPath, fileName)
  yield put(globalActions.hideTopLoading())
  const {fileURL} = result
  const fileId = (fileName as string).split('.')[0]
  const newAvatar = new Photo(
    fileId,
    fileName,
    '',
    fileURL,
    fileURL,
    uid,
    moment.utc().valueOf(),
    config.data.coverFolderPath,
    config.data.coverFolderPath,
    0,
    0,
    {},
    UserPermissionType.Public,
    []   
  )

  const mapImage = Map({[fileId]: fromJS({...newAvatar})})
  yield put(imageGalleryActions.addImageList(mapImage))
  yield put(imageGalleryActions.addCoverImages(uid, Map({[fileId]: true})))
}

/**
 * Watch create album
 */
function* watchCreateAlbum(action: { type: ImageGalleryActionType, payload: any }) {
  const { albumPost, images } = action.payload
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    const createAlbumRequest = GalleryAPI.createAlbumRequest(uid)
    yield put(serverActions.sendRequest(createAlbumRequest))
    try {
      yield call(saveAlbum, uid, albumPost, images)

    } catch (error) {
      createAlbumRequest.status = ServerRequestStatusType.Error
      yield put(serverActions.sendRequest(createAlbumRequest))
      yield put(globalActions.showMessage(`gallerySaga/watchCreateAlbum  ${error}`))
      console.trace(`error`, error)
    }
  }
}

/**
 * Watch delete video from gallery
 */
function* watchDeleteVideo(action: { type: ImageGalleryActionType, payload: any }) {
  const { videoId } = action.payload
  yield call(dbDeleteVideo, videoId)
}

/**
 * Watch delete image
 */
function* watchDeleteImage(action: { type: ImageGalleryActionType, payload: any }) {
  const { fileId, folderName, fileName } = action.payload
   yield call(dbDeleteImage, fileId, folderName, fileName)
}

export default function* gallerySaga() {
  yield all([
    takeLatest(ImageGalleryActionType.DB_FETCH_IMAGE_GALLERY, dbFetchImageGallery),
    takeLatest(ImageGalleryActionType.DB_FETCH_ALBUM_IMAGES, watchFetchAlbumImages),
    takeLatest(ImageGalleryActionType.DB_FETCH_AVATAR_IMAGES, watchFetchAvatarImages),
    takeLatest(ImageGalleryActionType.DB_FETCH_COVER_IMAGES, watchFetchCoverImages),
    takeLatest(ImageGalleryActionType.DB_DELETE_IMAGE, watchDeleteImage),
    takeLatest(ImageGalleryActionType.DB_UPLOAD_VIDEO, watchUploadVideo),
    takeEvery(ImageGalleryActionType.DB_UPLOAD_IMAGE, watchUploadImage),
    takeEvery(ImageGalleryActionType.DB_UPLOAD_AVATAR, watchUploadAvatar),
    takeEvery(ImageGalleryActionType.DB_UPLOAD_COVER, watchUploadCover),
    takeLatest(ImageGalleryActionType.DB_CREATE_ALBUM, watchCreateAlbum),
    takeLatest(ImageGalleryActionType.DB_FETCH_VIDEO_GALLERY, dbFetchVideoGallery),
    takeLatest(ImageGalleryActionType.DB_DELETE_VIDEO, watchDeleteVideo),
  ])
}