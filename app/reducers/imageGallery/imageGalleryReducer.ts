// - Import react components
import _ from 'lodash'

// - Import domain
import { User } from "domain/users";
import { Image } from "domain/imageGallery";

// - Import image gallery action types
import {ImageGalleryActionType} from 'constants/imageGalleryActionType'


import { IImageGalleryAction } from "./IImageGalleryAction";
import { ImageGalleryState } from "./ImageGalleryState";


/**
 *  Image gallery reducer
 */
export var imageGalleryReducer = (state: ImageGalleryState = new ImageGalleryState(), action: IImageGalleryAction) => {
  const { payload } = action

  switch (action.type) {
    /* ----------------- CRUD ----------------- */
    case ImageGalleryActionType.ADD_IMAGE_GALLERY:
      return {
        ...state,
        images: [...state.images!, payload.image]
      }
    case ImageGalleryActionType.ADD_IMAGE_LIST_GALLERY:
        return {
          ...state,
          images: [...payload],
          loaded: true
        }

    case ImageGalleryActionType.DELETE_IMAGE:
      return {
        ...state,
        images: [
          ...state.images!.filter((item: Image) => {
            return item.id !== payload.id
          })
        ]
      }
    case ImageGalleryActionType.SET_IMAGE_URL:
      return {
        ...state,
        imageURLList: {
          ...state.imageURLList,
          [payload.name]: payload.url
        }
      }

    case ImageGalleryActionType.SEND_IMAGE_REQUEST:
      return {
        ...state,
        imageRequests: [
          ...state.imageRequests,
              payload
        ]
      }

    case ImageGalleryActionType.CLEAT_ALL_DATA_IMAGE_GALLERY:
      return new ImageGalleryState()



    default:
      return state;
  }
}
