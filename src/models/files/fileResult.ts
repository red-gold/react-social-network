export class FileResult {

  constructor (private _fileURL: string, private _fileFullPath: string) {

  }

  public get fileURL (): string {
    return this._fileURL
  }

  public get fileFullPath (): string {
    return this._fileFullPath
  }

}