// - Import react component
import { storageRef } from 'app/firebaseClient/'

//- Import actions

// - Get file Extension
const getExtension = (fileName) => {
  let re = /(?:\.([^.]+))?$/
  return re.exec(fileName)[1]
}

// Converts image to canvas returns new canvas element
const convertImageToCanvas = (image) => {
  let canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  canvas.getContext('2d').drawImage(image, 0, 0)

  return canvas
}

/**
 * Upload image on the server
 * @param {file} file 
 * @param {string} fileName 
 */
const uploadImage = (file, fileName, progress) => {
    
        return new Promise((resolve, reject) => {
            // Create a storage refrence
            let storegeFile = storageRef.child(`images/${fileName}`)
    
            // Upload file
            let task = storegeFile.put(file)
            task.then((result) => {
                resolve(result)
            }).catch((error) => {
                reject(error)
            })
    
            // Upload storage bar
            task.on('state_changed', (snapshot) => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
        let reader = new FileReader()
        reader.onload = function (readerEvent) {
            let image = new Image()
            image.onload = function (imageEvent) {

                // Resize the image
                let canvas = document.createElement('canvas'),
                    max_size = 986,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width
                        width = max_size
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height
                        height = max_size
                    }
                }
                canvas.width = width
                canvas.height = height
                canvas.getContext('2d').drawImage(image, 0, 0, width, height)
                let dataUrl = canvas.toDataURL()
                let resizedImage = dataURLToBlob(dataUrl)
                let evt = new CustomEvent('onSendResizedImage', { detail: {resizedImage,fileName} })
                window.dispatchEvent(evt)
      
                
            }
            image.src = readerEvent.target.result
        }
        reader.readAsDataURL(file)
    }
}


/**
 * Convert data URL to blob
 * @param {object} dataURL 
 */
const dataURLToBlob = (dataURL) => {
  
 let BASE64_MARKER = 'base64,'
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(',')
        let contentType = parts[0].split(':')[1]
        let raw = parts[1]

        return new Blob([raw], {type: contentType})
    }

    let parts = dataURL.split(BASE64_MARKER)
    let contentType = parts[0].split(':')[1]
    let raw = window.atob(parts[1])
    let rawLength = raw.length

    let uInt8Array = new Uint8Array(rawLength)

    for (let i = 0 ;i < rawLength; ++i) {
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