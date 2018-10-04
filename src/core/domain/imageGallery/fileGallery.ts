import { BaseDomain } from 'core/domain/common'

export class FileGallery extends BaseDomain {

  /**
   * Image identifier
   */
  public id?: string | null

  /**
   * Image creation date
   */
  public creationDate: number

  /**
   * Image delete date
   */
  public deleteDate: string

  /**
   * Image URL address
   */
  public URL: string

  /**
   * Image owner identifier
   */
  public ownerUserId: string

  /**
   * Last edit date
   */
  public lastEditDate: number

  /**
   * If the image was deleted {true} or not {false}
   */
  public deleted: boolean

}
