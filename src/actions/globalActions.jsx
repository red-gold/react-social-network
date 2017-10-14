// - Import image gallery action types
import * as types from 'actionTypes'

// - Import actions
import * as postActions from 'postActions'
import * as commentActions from 'commentActions'
import * as userActions from 'userActions'

/**
 * Progress change
 * @param {string} percent 
 * @param {boolean} visible 
 */
export const progressChange = (percent, visible) => {
  return {
    type: types.PROGRESS_CHANGE,
    payload: {percent, visible}
  }

}

/**
 * Default data loaded status will be true
 */
export const defaultDataEnable = () => {
  return{
    type: types.DEFAULT_DATA_ENABLE
  }
}

/**
 * Default data loaded status will be false
 * @param {boolean} status 
 */
export const defaultDataDisable = () => {
  return{
    type: types.DEFAULT_DATA_DISABLE
  }
}


// - Show notification of request
export const showNotificationRequest = () =>  {
  return{
    type: types.SHOW_SEND_REQUEST_MESSAGE_GLOBAL
  }
}

// - Show notification of success
export const showNotificationSuccess = () =>  {
  return{
    type: types.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL
  }
}

/**
 * Hide global message
 */
export const hideMessage = () => {
  return{
    type: types.HIDE_MESSAGE_GLOBAL
  }

}

/**
 * Show error message
 * @param {string} message 
 */
export const showErrorMessage = (message) => { 
  return {
    type: types.SHOW_ERROR_MESSAGE_GLOBAL,
    payload: message
  }

}

/**
 * Set header title
 */
export const setHeaderTitleOpt = (opt,payload) => {
  return (dispatch,getState) => {
    switch (opt) {
      case 'profile':
        const userName = getState().user.info && getState().user.info[payload] ? getState().user.info[payload].fullName : ''
        dispatch(setHeaderTitle(userName))
        break;
    
      default:
        break;
    }

  }

}

/**
 * Set header title
 */
export const setHeaderTitle = (text) => {
  return{
    type: types.SET_HEADER_TITLE,
    payload: text
  }

}

/**
 * Open post write
 */
export const openPostWrite = () => {
  return{
    type: types.OPEN_POST_WRITE
  }

}

/**
 * Close post write
 */
export const closePostWrite = () => {
  return{
    type: types.CLOSE_POST_WRITE
  }

}

/**
 * Show top loading
 */
export const showTopLoading = () => {
  return{
    type: types.SHOW_TOP_LOADING
  }

}

/**
 * Hide top loading
 */
export const hideTopLoading = () => {
  return{
    type: types.HIDE_TOP_LOADING
  }

}




/**
 * Store temp data
 */
export const temp = (data) => {
  return{
    type: types.TEMP,
    payload: data
  }

}



// - Load data for guest
export const loadDataGuest = () => {
  return (dispatch,getState) => {
 }

}
