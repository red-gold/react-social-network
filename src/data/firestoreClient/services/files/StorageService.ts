import { storageRef } from 'data/firestoreClient'
import { IStorageService } from 'core/services/files'
import { FileResult } from 'models/files/fileResult'
import { injectable } from 'inversify'

@injectable()
export class StorageService implements IStorageService {

  /**
   * Upload file on the server
   */
  public uploadFile = (folderName: string, file: any, fileName: string,
    onProgress: (percentage: number, status: boolean, fileName: string, meta?: any) => void,
    onSuccess: (fileResult: FileResult, meta?: any) => void,
    onFailure: (error: any) => void
  ) => {

    // Create a storage refrence
    let storegeFile = storageRef.child(`${folderName}/${fileName}`)

    // Upload file
    let task = storegeFile.put(file)

    // Upload storage bar
    task.on('state_changed', (snapshot: any) => {
      let percentage: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      onProgress(percentage, true, fileName)
    }, (error) => {
      onFailure(error)
      console.log('========== Upload Image ============')
      console.log(error)
      console.log('====================================')

    }, () => {
      onProgress(100, false, fileName)
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        onSuccess(new FileResult(downloadURL), { url: downloadURL })

      })

    })
  }

  /**
   * Delete file
   */
  public deleteFile = async (folderName: string, fileName: string) => {
    // Create a reference to the file to delete
    var fileRef = storageRef.child(`${folderName}/${fileName}`)

    // Delete the file
    await fileRef.delete()
  }

}
