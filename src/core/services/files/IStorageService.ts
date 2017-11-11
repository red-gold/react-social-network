import { FileResult } from 'models/files/fileResult'

export interface IStorageService {

  /**
   * Storage file service
   *
   * @memberof IStorageService
   */
  uploadFile: (file: any, fileName: string, progress: (percentage: number, status: boolean) => void) => Promise<FileResult>
}
