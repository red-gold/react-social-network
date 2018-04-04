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
export let imageGalleryReducer = (state = Map(new ImageGalleryState()), action: IImageGalleryAction) => {
  const { payload } = action

  switch (action.type) {
    /* ----------------- CRUD ----------------- */
    case ImageGalleryActionType.ADD_IMAGE_GALLERY:
      return state
        .mergeIn(['images'], List([payload]))

    case ImageGalleryActionType.ADD_IMAGE_LIST_GALLERY:
      return state
        .set('images', List(payload))
        .set('loaded', true)

    case ImageGalleryActionType.DELETE_IMAGE:
      return state
        .update('images', (images: List<Image>) => {
         return images.filter((image) => image!.id !== payload)
        })

    case ImageGalleryActionType.SET_IMAGE_URL:
      return state
        .setIn(['imageURLList', payload.name], payload.url)

    case ImageGalleryActionType.SEND_IMAGE_REQUEST:
      return state
        .mergeIn(['imageRequests'], payload)

    case ImageGalleryActionType.CLEAT_ALL_DATA_IMAGE_GALLERY:
      return Map(new ImageGalleryState())

    default:
      return state
  }
}
