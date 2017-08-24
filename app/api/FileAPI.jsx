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
 * Upload image on the server
 * @param {file} file 
 * @param {string} fileName 
 */
const uploadImage = (file, fileName, progress) => {
    
        return new Promise((resolve, reject) => {
            // Create a storage refrence
            var storegeFile = storageRef.child(`images/${fileName}`)
    
            // Upload file
            var task = storegeFile.put(file)
            task.then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
    
            // Upload storage bar
            task.on('state_changed', (snapshot) => {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                progress(percentage, true)
            }, (error) => {
                console.log('========== Upload Image ============')
                console.log(error)
                console.log('====================================')
    
            }, (complete) => {
                progress(100, false)
            })
        })
    
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



export default {
  dataURLToBlob,
  convertImageToCanvas,
  getExtension,
  constraintImage,
  uploadImage

}