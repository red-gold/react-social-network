// - Import react componetns
import moment from 'moment'
import { firebaseRef, firebaseAuth, storageRef } from 'app/firebase/'

// - Import domain
import { Image } from "domain/imageGallery";

// - Import action types
import {ImageGalleryActionType} from 'constants/imageGalleryActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'

// - Import app API
import FileAPI from 'api/FileAPI'

/* _____________ UI Actions _____________ */

declare const console: any;

/**
 * Download images for image gallery
 */
export const downloadForImageGallery = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      let imagesRef: any = firebaseRef.child(`userFiles/${uid}/files/images`);

      return imagesRef.once('value').then((snapshot: any) => {
        var images = snapshot.val() || {};
        var parsedImages: Image[] = []
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
 * @param  {string} imageFullPath is the folder name + / + file name
 */
export const dbSaveImage = (imageURL: string,imageFullPath: string) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid
    var image: Image = {
      creationDate: moment().unix(),
      deleteDate: '',
      URL: imageURL,
      fullPath:imageFullPath,
      ownerUserId: uid,
      lastEditDate: 0,
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
export const dbDeleteImage = (id: string) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid;

    // Write the new data simultaneously in the list
    var updates: any = {};
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
export const dbUploadImage = (file: any, fileName: string) => {
  return (dispatch: any, getState: Function) => {
    // Create a storage refrence
    let storegeFile: any = storageRef.child(`images/${fileName}`)

    // Upload file
    let task: any = storegeFile.put(file)
    dispatch(globalActions.showTopLoading())

    // Upload storage bar
    task.on('state_changed', (snapshot: any) => {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      dispatch(globalActions.progressChange(percentage, true))


    }, (error: any) => {
      dispatch(globalActions.showErrorMessage(error.code))
      dispatch(globalActions.hideTopLoading())

    }, (complete?: any ) =>  {
      dispatch(globalActions.progressChange(100, false))
      dispatch(dbSaveImage(fileName,''))
      dispatch(globalActions.hideTopLoading())
        
    })
  }
}

/**
 * Download image from server
 * @param {string} fileName 
 */
export const dbDownloadImage = (fileName: string) => {

  return (dispatch: any, getState: Function) => {
    if (fileName == 'noImage')
      return {}
    if (getState().imageGallery.imageURLList[fileName] && fileName !== '')
      return

    if (getState().imageGallery.imageRequests.indexOf(fileName) > -1)
      return
    dispatch(sendImageRequest(fileName))

    // Create a reference to the file we want to download    
    let starsRef: any = storageRef.child(`images/${fileName}`);

    // Get the download URL
    starsRef.getDownloadURL().then((url: string) => {
      // Insert url into an <img> tag to "download"
      if (!getState().imageGallery.imageURLList[fileName] || fileName === '')
        dispatch(setImageURL(fileName, url))
    }).catch((error:any) => {

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
 * @param {Image[]} images is an array of images
 */
export const addImageList = (images: Image[]) => {
  return { type: ImageGalleryActionType.ADD_IMAGE_LIST_GALLERY,payload: images }
}

/**
 * Add image to image gallery
 * @param {Image} image
 */
export const addImage = (image: Image) => {
  return { type: ImageGalleryActionType.ADD_IMAGE_GALLERY, payload: image }
}

/**
 * Delete an image
 * @param  {string} id is an image identifier
 */
export const deleteImage = (id: string) => {
  return { type: ImageGalleryActionType.DELETE_IMAGE, payload: id }

}

/**
 * Delete an image
 */
export const setImageURL = (name: string, url: string) => {
  return {
    type: ImageGalleryActionType.SET_IMAGE_URL,
    payload: { name, url }
  }

}

/**
 * Clear all data in image gallery store
 */
export const clearAllData = () => {
  return {
    type: ImageGalleryActionType.CLEAT_ALL_DATA_IMAGE_GALLERY
  }
}

/**
 * Send image request
 */
export const sendImageRequest = (name: string) => {
  return {
    type: ImageGalleryActionType.SEND_IMAGE_REQUEST,
    payload: name
  }


}