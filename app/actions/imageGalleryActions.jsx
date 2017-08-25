// - Import react componetns
import moment from 'moment'
import { firebaseRef, firebaseAuth, storageRef } from 'app/firebase/'


// - Import action types
import * as types from 'actionTypes'

// - Import actions
import * as globalActions from 'globalActions'

// - Import app API
import FileAPI from 'FileAPI'

/* _____________ UI Actions _____________ */


/**
 * Clear selected data
 */
export const clearSelectData = () => {
  return { type: types.CLEARS_SELECT_IMAGE_GALLERY }

}

/**
 * Clear all data in image gallery store
 */
export const clearAllData = () => {
  return {
    type: types.CLEAT_ALL_DATA_IMAGE_GALLERY
  }
}


/**
 * Download images for image gallery
 */
export const downloadForImageGallery = () => {
  return (dispatch, getState) => {
    var uid = getState().authorize.uid
    if (uid) {
      var imagesRef = firebaseRef.child(`userFiles/${uid}/files/images`);

      return imagesRef.once('value').then((snapshot) => {
        var images = snapshot.val() || {};
        var parsedImages = []
        Object.keys(images).forEach((imageId) => {
          parsedImages.push({
            id: imageId,
            ...images[imageId]
          })
        })
        dispatch(addImageList(parsedImages));
      })

    }
  }

}

/* _____________ CRUD Database_____________ */

/**
 * Save image URL in the server
 * @param  {string} imageURL is the URL of image
 */
export const dbSaveImage = (imageURL,imageFullPath) => {
  return (dispatch, getState) => {

    var uid = getState().authorize.uid
    var image = {
      creationDate: moment().unix(),
      deletationDate: '',
      URL: imageURL,
      fullPath:imageFullPath,
      ownerUserId: uid,
      lastEditDate: '',
      deleted: false
    }

    var imageRef = firebaseRef.child(`userFiles/${uid}/files/images`).push(image)
    return imageRef.then(() => {
      dispatch(addImage({
        ...image,
        id: imageRef.key
      }))
    })

  }
}

/**
 * Delete an image from database
 * @param  {string} id of image
 */
export const dbDeleteImage = (id) => {
  return (dispatch, getState) => {

    // Get current user id
    var uid = getState().authorize.uid

    // Write the new data simultaneously in the list
    var updates = {};
    updates[`userFiles/${uid}/files/images/${id}`] = null;

    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteImage(id))
      console.log('image removed: ', id);
    }, (error) => {
      console.log(error);
    });
  }

}

/**
 * Upload image on the server
 * @param {file} file 
 * @param {string} fileName 
 */
export const dbUploadImage = (file, fileName) => {
  return (dispatch, getState) => {
    // Create a storage refrence
    var storegeFile = storageRef.child(`images/${fileName}`)

    // Upload file
    var task = storegeFile.put(file)
    dispatch(globalActions.showTopLoading())

    // Upload storage bar
    task.on('state_changed', (snapshot) => {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      dispatch(globalActions.progressChange(percentage, true))


    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.code))
      dispatch(globalActions.hideTopLoading())

    }, (complete) => {
      dispatch(globalActions.progressChange(100, false))
      dispatch(dbSaveImage(fileName))
      dispatch(globalActions.hideTopLoading())

    })
  }
}

/**
 * Download image from server
 * @param {string} fileName 
 */
export const dbDownloadImage = (fileName) => {

  return (dispatch, getState) => {
    if (fileName == 'noImage')
      return {}
    if (getState().imageGallery.imageURLList[fileName] && fileName !== '')
      return

    if (getState().imageGallery.imageRequests.indexOf(fileName) > -1)
      return
    dispatch(sendImageRequest(fileName))

    // Create a reference to the file we want to download    
    var starsRef = storageRef.child(`images/${fileName}`);

    // Get the download URL
    starsRef.getDownloadURL().then((url) => {
      // Insert url into an <img> tag to "download"
      if (!getState().imageGallery.imageURLList[fileName] || fileName === '')
        dispatch(setImageURL(fileName, url))
    }).catch((error) => {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object_not_found':
          // File doesn't exist
          dispatch(globalActions.showErrorMessage('storage/object_not_found'))
          break;

        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          dispatch(globalActions.showErrorMessage('storage/unauthorized'))
          break;

        case 'storage/canceled':
          // User canceled the upload
          dispatch(globalActions.showErrorMessage('storage/canceled'))
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          dispatch(globalActions.showErrorMessage('storage/unknown'))
          break;
      }
    });
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add image list to image gallery
 * @param {[object]} images is an array of images
 */
export const addImageList = (images) => {
  return { type: types.ADD_IMAGE_LIST_GALLERY, images }
}

/**
 * Add image to image gallery
 * @param {object} image
 */
export const addImage = (image) => {
  return { type: types.ADD_IMAGE_GALLERY, image }
}

/**
 * Delete an image
 * @param  {string} id is an image identifier
 */
export const deleteImage = (id) => {
  return { type: types.DELETE_IMAGE, id }

}

/**
 * Delete an image
 */
export const setImageURL = (name, url) => {
  return {
    type: types.SET_IMAGE_URL,
    payload: { name, url }
  }

}

/**
 * Send image request
 */
export const sendImageRequest = (name) => {
  return {
    type: types.SEND_IMAGE_REQUEST,
    payload: name
  }


}