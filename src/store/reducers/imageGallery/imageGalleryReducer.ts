// - Import react components
import _ from 'lodash'
import { Map, List } from 'immutable'

// - Import domain
import { User } from 'src/core/domain/users'
import { Image } from 'src/core/domain/imageGallery'

// - Import image gallery action types
import { ImageGalleryActionType } from 'constants/imageGalleryActionType'

import { IImageGalleryAction } from './IImageGalleryAction'
import { ImageGalleryState } from './ImageGalleryState'

/**
 *  Image gallery reducer
 */
export let imageGalleryReducer = (state = Map(new ImageGalleryState() as any), action: IImageGalleryAction) => {
  const { payload } = action

  switch (action.type) {
    /* ----------------- CRUD ----------------- */
    case ImageGalleryActionType.ADD_IMAGE:
      return state
        .setIn(['entities', payload.image.get('id')], payload.image)

    case ImageGalleryActionType.ADD_IMAGE_LIST:
      return state
        .mergeDeepIn(['entities'], payload.entities)
        .set('loaded', true)

    case ImageGalleryActionType.ADD_ALBUM_IMAGE_LIST:
      return state
        .mergeDeepIn(['album', payload.albumId, 'list'], payload.imageIds)
        .set('loaded', true)

    case ImageGalleryActionType.ADD_AVATAR_IMAGE_LIST:
      return state
        .mergeDeepIn(['avatar', payload.userId, 'list'], payload.imageIds)
        .set('loaded', true)

    case ImageGalleryActionType.ADD_COVER_IMAGE_LIST:
      return state
        .mergeDeepIn(['cover', payload.userId, 'list'], payload.imageIds)
        .set('loaded', true)

    case ImageGalleryActionType.HAS_MORE_DATA_ALBUM_IMAGE:
      return state
        .setIn(['album', payload.albumId, 'hasMoreData'], true)

    case ImageGalleryActionType.NO_MORE_DATA_ALBUM_IMAGE:
      return state
        .setIn(['album', payload.albumId, 'hasMoreData'], false)

    case ImageGalleryActionType.LAST_ALBUM_IMAGE_ID:
      return state
        .setIn(['album', payload.albumId, 'lastImageId'], payload.imageId)

    case ImageGalleryActionType.ADD_ALBUM_ID_LIST:
      return state
        .mergeDeepIn(['entities'], payload.entities)
        .set('loaded', true)

    case ImageGalleryActionType.DELETE_IMAGE:
      return state.deleteIn(['entities', payload.imageId])

    case ImageGalleryActionType.SET_IMAGE_URL:
      return state
        .setIn(['imageURLList', payload.name], payload.url)

    case ImageGalleryActionType.ADD_VIDEO_GALLERY:
      return state
        .update('videos', (videoList: List<any>) => videoList.push(payload))

    case ImageGalleryActionType.ADD_VIDEO_LIST_GALLERY:
      return state
        .set('videos', List(payload))
        .set('loaded', true)

    case ImageGalleryActionType.DELETE_VIDEO:
      return state
        .update('videos', (videos: List<Image>) => {
          return videos.filter((video) => video!.id !== payload)
        })

    case ImageGalleryActionType.SEND_IMAGE_REQUEST:
      return state
        .mergeIn(['imageRequests'], payload)

    case ImageGalleryActionType.CLEAT_ALL_DATA_IMAGE_GALLERY:
      return Map(new ImageGalleryState() as any)

    default:
      return state
  }
}
