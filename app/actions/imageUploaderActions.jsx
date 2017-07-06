// - Import image uploader action types
import * as types from 'actionTypes'


// - Image uploader actions

export const openImageUploader = (status)=> {
  return {
    type: types.OPEN_IMAGE_UPLOADER,
    status
  }
}

export const openImageEditor = (editStatus) =>{
  return{
    type: types.OPEN_IMAGE_EDITOR,
    editStatus

  }
}
