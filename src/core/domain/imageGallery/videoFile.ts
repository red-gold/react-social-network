import { BaseDomain } from 'core/domain/common'
import { FileGallery } from './fileGallery'

export class VideoFile extends FileGallery {

  /**
   * The address of video thumbnails on the post
   */
  public videoThumbnails?: string

}
