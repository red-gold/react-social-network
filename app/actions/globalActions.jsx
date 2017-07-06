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
 * @param {boolean} status 
 */
export const defaultDataEnable = (status) => {
  return{
    type: types.DEFAULT_DATA_ENABLE
  }
}

/**
 * Default data loaded status will be false
 * @param {boolean} status 
 */
export const defaultDataDisable = (status) => {
  return{
    type: types.DEFAULT_DATA_DISABLE
  }
}



/**
 * Show notification normally
 * @param {string} message 
 */
export const showNotificationNormal = (message) =>  {
  return (dispatch,getState) => {
      dispatch(showNormalMessage(message))

  }
}


// - Show global normal message
export const showNormalMessage = (message) => {
  return{
    type: types.SHOW_NORMAL_MESSAGE_GLOBAL,
    message
  }

}

// - Show notification of request
export const showNotificationRequest = () =>  {
  return (dispatch,getState) => {
      dispatch(showSendRequestMessage())
  }
}


// - Show global request sent message
export const showSendRequestMessage = () => {
  return{
    type: types.SHOW_SEND_REQUEST_MESSAGE_GLOBAL
  }

}

// - Show notification of success
export const showNotificationSuccess = () =>  {
  return (dispatch,getState) => {
      dispatch(showRequestSuccessMessage())

  }
}

// - Show global request successful message
export const showRequestSuccessMessage = () => {
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
  var userString = "{\"avatar\":\"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg\",\"contact\":\"amir.gholzam@live.com\",\"email\":\"amir.gholzam@live.com\",\"fullName\":\"React Social Blog\",\"password\":\"123qwe\",\"summary\":\" The React Social Blog (RSB) Application is a diary app blog\"}"
  var postString = '[{"id":"-KkauHBOZXlALsHIrNsvsq","body":"The React Social Blog (RSB) Application is a diary app blog based on Semantic ui React for UI, Redux with react-redux for managing states and React for managing DOM .It is an open source project as a portfolio.\\n\\nI will be really grateful to receive any issue: \\nhttps://github.com/Qolzam/react-blog/issues\\n\\n \\n","commentCounter":0,"creationDate":1495301432,"deletationDate":"","deleted":false,"image":"http://www.freeimageslive.com/galleries/nature/abstract/preview/frosty_grass.jpg","lastEditDate":"","ownerAvatar":"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg","ownerDisplayName":"React Social Blog","ownerUserId":"5flWuB1RieZR7GIAwHYMPYaI5o33","postTypeId":1,"score":0,"video":"","viewCount":0},{"id":"-KkauHBOZXlALsHIrNIq","body":"It is a demo website","commentCounter":0,"creationDate":1495301432,"deletationDate":"","deleted":false,"image":"http://www.freeimageslive.com/galleries/nature/environment/pics/eaten%20_flower0905.jpg","lastEditDate":"","ownerAvatar":"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg","ownerDisplayName":"React Social Blog","ownerUserId":"5flWuB1RieZR7GIAwHYMPYaI5o33","postTypeId":1,"score":0,"video":"","viewCount":0},{"id":"-KkauHBOZXlsLsHIrNIq","body":"This is an open source project","commentCounter":0,"creationDate":1495301432,"deletationDate":"","deleted":false,"image":"http://www.freeimageslive.com/galleries/nature/environment/pics/eaten%20_flower0905.jpg","lastEditDate":"","ownerAvatar":"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg","ownerDisplayName":"React Social Blog","ownerUserId":"5flWuB1RieZR7GIAwHYMPYaI5o33","postTypeId":1,"score":0,"video":"","viewCount":0},{"id":"-KkaurBOZXlALsHIrNIq","body":"I have documentaion, testing, add some features DEBUG in my todo list","commentCounter":0,"creationDate":1495301432,"deletationDate":"","deleted":false,"image":"http://www.freeimageslive.com/galleries/nature/environment/pics/eaten%20_flower0905.jpg","lastEditDate":"","ownerAvatar":"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg","ownerDisplayName":"React Social Blog","ownerUserId":"5flWuB1RieZR7GIAwHYMPYaI5o33","postTypeId":1,"score":0,"video":"","viewCount":0}]'
  var postCommentString = "{\"postComments\":{\"-KkauHBOZXlALsHIrNIq\":{\"-KkaxkH1WmfcQaidsNHK3R\":{\"creationDate\":1495302341,\"postId\":\"-KkauHBOZXlALsHIrNIq\",\"score\":0,\"text\":\"On developing :)\",\"userAvatar\":\"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg\",\"userDisplayName\":\"React Social Blog\",\"userId\":\"5flWuB1RieZR7GIAwHYMPYaI5o33\"},\"-KkafsdfxkH1WmfcQaiNHK3R\":{\"creationDate\":1495302341,\"postId\":\"-KkauHBOZXlALsHIrNIq\",\"score\":0,\"text\":\"This is a good project for lorem if you want to learn more and deeply about react and ui frameworkes. I'm preparing a good document for lorem :)\",\"userAvatar\":\"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg\",\"userDisplayName\":\"React Social Blog\",\"userId\":\"5flWuB1RieZR7GIAwHYMPYaI5o33\"},\"-KkaxkH1WfrmfcQaiNHK3R\":{\"creationDate\":1495302341,\"postId\":\"-KkauHBOZXlALsHIrNIq\",\"score\":0,\"text\":\"On I'm so happy now that I have you react-blog so far I was looking for you oh it's just lorem so don't make it serious :)\",\"userAvatar\":\"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg\",\"userDisplayName\":\"React Social Blog\",\"userId\":\"5flWuB1RieZR7GIAwHYMPYaI5o33\"},\"-KkaxkH1WmfcQakeiNHK3R\":{\"creationDate\":1495302341,\"postId\":\"-KkauHBOZXlALsHIrNIq\",\"score\":0,\"text\":\"On developing :)\",\"userAvatar\":\"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg\",\"userDisplayName\":\"React Social Blog\",\"userId\":\"5flWuB1RieZR7GIAwHYMPYaI5o33\"},\"-KkaxkH1WmfcQpraiNHK3R\":{\"creationDate\":1495302341,\"postId\":\"-KkauHBOZXlALsHIrNIq\",\"score\":0,\"text\":\"On developing :)\",\"userAvatar\":\"http://www.freeimageslive.com/galleries/nature/abstract/preview/frostyleaves00406.jpg\",\"userDisplayName\":\"React Social Blog\",\"userId\":\"5flWuB1RieZR7GIAwHYMPYaI5o33\"}}}}"
  var user = JSON.parse(userString)
  dispatch(userActions.addUserInfo(user))
  var post = JSON.parse(postString)
  dispatch(postActions.addPosts(post))
  var postComment = JSON.parse(postCommentString)
  dispatch(commentActions.addCommentList(postComment.postComments))
}

}
