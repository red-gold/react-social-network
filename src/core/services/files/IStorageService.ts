import { FileResult } from 'models/files/fileResult'

export interface IStorageService {

  /**
   * Storage file service
   */
  uploadFile: (folderName: string, file: any, fileName: string,
    onProgress: (percentage: number, status: boolean, fileName: string) => void,
    onSuccess: (fileResult: FileResult, meta?: any) => void,
    onFailure: (error: any) => void) => void
    
    /**
     * Delete file
     */
    deleteFile: (folderName: string, fileName: string) => Promise<void>
}