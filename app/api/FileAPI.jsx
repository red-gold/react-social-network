// - Import react component
import { storageRef } from 'app/firebase/'

//- Import actions

// - Get file Extension
const getExtension = (fileName) => {
  var re = /(?:\.([^.]+))?$/;
  return re.exec(fileName)[1];
}

// Converts image to canvas; returns new canvas element
const convertImageToCanvas = (image) => {
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  return canvas;
}

/**
 * Constraint image size
 * @param {file} file 
 * @param {number} maxWidth 
 * @param {number} maxHeight 
 */
const constraintImage = (file,fileName, maxWidth, maxHeight) => {
    // Ensure it's an image
    if(file.type.match(/image.*/)) {

        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 986,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL();
                var resizedImage = dataURLToBlob(dataUrl);
                let evt = new CustomEvent('onSendResizedImage', { detail: {resizedImage,fileName} });
                window.dispatchEvent(evt);
      
                
            }
            image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// - Delete file from storage
const deleteFile = (folderName, fileName, callBackSuccess, callBackError) => {

  // Create a reference to the file to delete
  var desertRef = storageRef.child(`${folderName}/${filename}`);

  // Delete the file
  desertRef.delete().then(function () {
    // File deleted successfully
    callBackSuccess()
    console.log('File has been deleted successfully');
  }).catch(function (error) {
    // Uh-oh, an error occurred!
    callBackError(error)
    console.log(error);
  });

}

/**
 * Convert data URL to blob
 * @param {object} dataURL 
 */
const dataURLToBlob = (dataURL) => {
  
 var BASE64_MARKER = ';base64,'
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',')
        var contentType = parts[0].split(':')[1]
        var raw = parts[1]

        return new Blob([raw], {type: contentType})
    }

    var parts = dataURL.split(BASE64_MARKER)
    var contentType = parts[0].split(':')[1]
    var raw = window.atob(parts[1])
    var rawLength = raw.length

    var uInt8Array = new Uint8Array(rawLength)

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }

    return new Blob([uInt8Array], {type: contentType})
}

// - Upload file
const uploadFile = (file, folderName, fileName, progressCallBack, errorCallBack, completeCallBack) => {

  // Create a storage refrence
  var storegeFile = storageRef.child(folderName + '/' + fileName)

  // Upload file
  var task = storegeFile.put(file)

  // Upload storage bar
  task.on('state_changed', (snapshot) => {
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    progressCallBack(percentage)
    // Set uploader progress value

  }, (error) => {
    errorCallBack(error)
  }, (complete) => {
    completeCallBack(complete)
  })
}

const downloadFile = (folderName, fileName, callBack) => {
  // Create a reference to the file we want to download
  var starsRef = storageRef.child(`${folderName}/${fileName}`);


  // Get the download URL
  starsRef.getDownloadURL().then((url) => {
    // Insert url into an <img> tag to "download"
    callBack(url)
  }).catch((error) => {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object_not_found':
        // File doesn't exist
        console.log('storage/object_not_found');
        break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.log('storage/unauthorized');
        break;

      case 'storage/canceled':
        // User canceled the upload
        console.log('storage/canceled');
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        console.log('storage/unknown');
        break;
    }
  });

}



export default {
  downloadFile,
  uploadFile,
  dataURLToBlob,
  deleteFile,
  convertImageToCanvas,
  getExtension,
  constraintImage

}