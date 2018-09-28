import { BaseDomain } from '../common'

export class Image extends BaseDomain {

    /**
     * Image identifier
     *
     * @type {string}
     * @memberof Image
     */
  public id?: string | null

    /**
     * Image creation date
     *
     * @type {number}
     * @memberof Image
     */
  public creationDate: number

   /**
    * Image delete date
    *
    * @type {string}
    * @memberof Image
    */
  public deleteDate: string

   /**
    * Image URL address
    *
    * @type {string}
    * @memberof Image
    */
  public URL: string

   /**
    * Image folder name with image name {folderName/imageName}
    *
    * @type {string}
    * @memberof Image
    */
  public fullPath: string

   /**
    * Image owner identifier
    *
    * @type {string}
    * @memberof Image
    */
  public ownerUserId: string

   /**
    * Last edit date
    *
    * @type {number}
    * @memberof Image
    */
  public lastEditDate: number

   /**
    * If the image was deleted {true} or not {false}
    *
    * @type {Boolean}
    * @memberof Image
    */
  public deleted: Boolean

}
