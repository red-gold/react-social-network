// - Import react components
import _ from 'lodash'


// - Import image gallery action types
import * as types from 'actionTypes'

/**
 * Default state for reducer
 */
var defaultState = {
  status: false,
  images: [],
  selectImage: '',
  selectURL: '',
  loaded: false,
  imageURLList: {},
  imageRequests: []
}

/**
 *  Image gallery reducer
 */
export var imageGalleryReducer = (state = defaultState, action) => {
  const { payload } = action

  switch (action.type) {
    case types.OPEN_IMAGE_GALLERY:
      return {
        ...state,
        status: action.status
      }
    /* ----------------- CRUD ----------------- */
    case types.ADD_IMAGE_GALLERY:
      return {
        ...state,
        images: [...state.images, action.image]
      }
    case types.ADD_IMAGE_LIST_GALLERY:
      {
        return {
          ...state,
          images: [...action.images],
          loaded: true
        }
      }
    case types.DELETE_IMAGE:
      return {
        ...state,
        images: [
          ...state.images.filter((item) => {
            return item.id !== action.id
          })
        ]
      }

    case types.IMAGE_SELECT_GALLERY:
      return {
        ...state,
        selectImage: action.image,
        selectURL: action.URL
      }
    case types.CLEARS_SELECT_IMAGE_GALLERY:
      return {
        ...state,
        selectImage: '',
        selectURL: ''
      }
    case types.SET_IMAGE_URL:
      return {
        ...state,
        imageURLList: {
          ...state.imageURLList,
          [payload.name]: payload.url
        }
      }

    case types.SEND_IMAGE_REQUEST:
      return {
        ...state,
        imageRequests: [
          ...state.imageRequests,
              payload
        ]
      }

    case types.CLEAT_ALL_DATA_IMAGE_GALLERY:
      return defaultState



    default:
      return state;
  }
}
