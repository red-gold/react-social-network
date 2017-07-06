// - Import action types
import * as types from 'actionTypes'


/**
 * Default state for reducer
 */
var defaultState = {
  status: false,
  editStatus:false

}

/**
 * Image uploader reducer
 * @param {object} state 
 * @param {object} action 
 */
export var imageUploaderReducer =  (state = defaultState, action) => {
    switch (action.type) {
      case types.OPEN_IMAGE_UPLOADER:
        if(action.status)
        {
          return{
            ...state,
            status: true
          }
        }
        else{
          return{
            ...state,
            status: false,
            editStatus: false
          }
        }
      case types.OPEN_IMAGE_EDITOR:
      return{
        ...state,
        editStatus: action.editStatus
      }
      default:
        return state;
    }
}
