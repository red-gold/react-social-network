export class FileResult {

  constructor (private _fileURL: string) {

  }

  public get fileURL (): string {
    return this._fileURL
  }

}