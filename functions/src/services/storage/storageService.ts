// [START import]
import * as functions from 'firebase-functions'
import { firebaseStorage, firestoreDB } from '../../data'
import { Photo } from '../../domain/imageGallery/photo'
const spawn = require('child-process-promise').spawn
import * as moment from 'moment/moment'
import { UserPermissionType } from '../../domain/common/userPermissionType'
const path = require('path')
const os = require('os')
const fs = require('fs')
// [END import]
const thumbnailRoot = 'thumbnail'

// [START generateThumbnail]
/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 */
// [START generateThumbnailTrigger]
export const storageService = functions.storage.object().onFinalize((object, context) => {
    // [END generateThumbnailTrigger]
    // [START eventAttributes]
    console.log('>> Params:  ', context)
    console.log('========== Event Type ============')
    console.log(context.eventType)
    console.log('====================================')
    
    const fileBucket = object.bucket // The Storage bucket that contains the file.
    const filePath: string = object.name // File path in the bucket.
    const contentType = object.contentType // File content type.
    const metageneration = object.metageneration // Number of times metadata has been generated. New objects have a value of 1.
    // [END eventAttributes]
    console.log('>> fileBucket: ', fileBucket)
    console.log('>> filePath: ', filePath)
    console.log('>> contentType: ', contentType)
    console.log('>> metageneration: ', metageneration)
    console.log('>> object: ', object)
    console.log('>> object Download URL :  ', )

    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.')
        return null
    }
    // [START stopConditions]
    // Exit if this is triggered on a file that is not an image.
 
    // Get the file name.
    const fileName = path.basename(filePath)
    const fileId = fileName.replace(/\.[^/.]+$/, '')
    const pathArray = filePath.split('/')
    if (pathArray.length !== 3) {
        console.log(`>> file path lenght is (${filePath}) less than 3`)
        return null
    }
    const rootName = pathArray[0]
    const userId = pathArray[1]
    // Exit if the image is already a thumbnail.
    if (rootName === thumbnailRoot || rootName === 'videos') {
        console.log('>> root name must be images')
        return null
    }
    // [END stopConditions]

    // [START thumbnailGeneration]
    // Download file from bucket.
    const bucket = firebaseStorage.bucket(fileBucket)
    const tempFilePath = path.join(os.tmpdir(), fileName)
    const metadata = {
        contentType: contentType,
    }
    const bucketFile = bucket.file(filePath)
    console.log('ROOT NAME::: ', rootName)
    /**
     * Save avatar and cover information
     * 
     * 
     * 
     */
    if (rootName === 'avatar' || rootName === 'cover') {
        console.log('this.is avatar or cover')
      return new Promise((resolve, reject) => {

          const imageFile =  bucketFile.getSignedUrl({
              action: 'read',
              expires: '03-09-2491'
          }).then((fileResult) => {
              const imageDownloadUrl = fileResult[0]
              console.log('Avatar Download URL :  ',imageDownloadUrl )
              const photoEntity = new Photo(
                  fileId,
                  fileName,
                  '',
                  imageDownloadUrl,
                  imageDownloadUrl,
                  userId,
                  moment.utc().valueOf(),
                  rootName,
                  rootName,
                  0,
                  0,
                  {},
                  UserPermissionType.Public,
                  []   
              ) 
              firestoreDB.collection('users').doc(userId).collection('images').doc(fileId)
              .set({...photoEntity}, {merge: true}).then(() => {
                  console.log('AVATAR or COVER result ::: ', photoEntity)
                  resolve()
              })
          })
      })  
    }

    return bucketFile.download({
        destination: tempFilePath,
    }).then((file) => {
        console.log('Image downloaded locally to', tempFilePath)
        // Generate a thumbnail using ImageMagick.
        return spawn('convert', [tempFilePath, '-thumbnail', '300x300>', tempFilePath])
    }).then(() => {
        console.log('Thumbnail created at', tempFilePath)
        // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
        const thumbFileName = fileName
        const thumbFilePath = path.join(thumbnailRoot, userId, thumbFileName)
        console.log('>> metadata : ', metadata)
        console.log('>> thumbFilePath raw : ', `${thumbnailRoot}/${userId}`, thumbFileName)
        console.log('>> thumbFilePath : ', thumbFilePath)
        // Uploading the thumbnail.
        return bucket.upload(tempFilePath, {
            destination: thumbFilePath,
            metadata: metadata,
        })
        // Once the thumbnail has been uploaded delete the local file to free up disk space.
    }).then((thumbFilePath) => {
       const imageFile =  bucketFile.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        })
       const thumbFile =  thumbFilePath[0].getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        })
        return new Promise<any>((resolve, reject) => {
            Promise.all([imageFile, thumbFile])
            .then((fileResult) => {
                const imageDownloadUrl = fileResult[0][0]
                const thumbnailDownloadUrl = fileResult[1][0]
                console.log('Image Download URL :  ',imageDownloadUrl )
                console.log('thumbFilePath Download URL :  ', thumbnailDownloadUrl )
                const photoEntity = new Photo(
                    fileId,
                    fileName,
                    '',
                    imageDownloadUrl,
                    thumbnailDownloadUrl,
                    userId,
                    moment.utc().valueOf(),
                    '',
                    '',
                    0,
                    0,
                    {},
                    UserPermissionType.Public,
                    []   
                )
                delete photoEntity.albumId
                delete photoEntity.albumName 
                delete photoEntity.permission 
                delete photoEntity.accessUserList 
                firestoreDB.collection('users').doc(userId).collection('images').doc(fileId)
                .set({...photoEntity}, {merge: true}).then(() => {
                    resolve()
                })
                fs.unlinkSync(tempFilePath)
            })
        })
    })
    // [END thumbnailGeneration]
})
// [END generateThumbnail]

export const onDeleteStorage = functions.storage.object().onDelete((object, context) => {
    // [END generateThumbnailTrigger]
    // [START eventAttributes]
    console.log('>> Params:  ', context)
    console.log('========== Event Type ============')
    console.log(context.eventType)
    console.log('====================================')
    
    const fileBucket = object.bucket // The Storage bucket that contains the file.
    const filePath: string = object.name // File path in the bucket.
    const contentType = object.contentType // File content type.
    const metageneration = object.metageneration // Number of times metadata has been generated. New objects have a value of 1.
    // [END eventAttributes]
    console.log('>> fileBucket: ', fileBucket)
    console.log('>> filePath: ', filePath)
    console.log('>> contentType: ', contentType)
    console.log('>> metageneration: ', metageneration)
    console.log('>> object: ', object)
    console.log('>> object Download URL :  ', )

    // [START stopConditions]
    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.')
        return null
    }
    // Get the file name.
    const fileName = path.basename(filePath)
    const fileId = fileName.replace(/\.[^/.]+$/, '')
    const pathArray = filePath.split('/')
    if (pathArray.length !== 3) {
        console.log(`>> file path lenght is (${filePath}) less than 3`)
        return null
    }
    const rootName = pathArray[0]
    const userId = pathArray[1]
    // Exit if the image is already a thumbnail.
    if (rootName === thumbnailRoot || rootName === 'videos') {
        console.log('>> root name must be images')
        return null
    }
    const thumbFileName = fileName
    const thumbFilePath = path.join(thumbnailRoot, userId, thumbFileName)
    const bucket = firebaseStorage.bucket(fileBucket)
    const bucketFile = bucket.file(thumbFilePath)

    const deleteFileBucket$ = bucketFile.delete()
    const deleteFileData$ = firestoreDB.collection('users').doc(userId).collection('images').doc(fileId).delete()
    return Promise.all([deleteFileBucket$, deleteFileData$])

})