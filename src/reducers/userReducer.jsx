// - Import action types
import * as types from 'actionTypes'

/**
 * Default state for reducer
 */
var defaultState = {
  info: {},
  loaded: false,
  openEditProfile: false
}

/**
 * User reducer
 */
export var userReducer = (state = defaultState, action) => {
  const { payload } = action
  switch (action.type) {
    case types.USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          [payload.uid]: {
            ...payload.info
          }
        }
      }
    case types.ADD_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          [payload.uid]: {
            ...payload.info
          }
        },
        loaded: true
      }
    case types.ADD_PEOPLE_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          ...payload
        }
      }
  
    case types.UPDATE_USER_INFO: 
      return {
        ...state,
        info: {
          ...state.info,
          [payload.uid]: {
            ...state.info[payload.uid],
            ...payload.info
          }
        }
      }
    

    case types.CLEAR_ALL_DATA_USER:
      return defaultState

    case types.CLOSE_EDIT_PROFILE:
      return {
        ...state,
        openEditProfile: false
      }

    case types.OPEN_EDIT_PROFILE:
      return {
        ...state,
        openEditProfile: true
      }


    default:
      return state;
  }
}
