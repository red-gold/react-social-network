import { VideoFile } from 'core/domain/imageGallery'
import { Map, Collection, List } from 'immutable'

export interface IVideoGalleryProps {

  /**
   * Select video from video gallery
   */
  set: (URL: string, fullPath: string) => void

  /**
   * Get video gallery
   */
  getVideoGallery?: () => any

  /**
   * Delete an video
   */
  deleteVideo?: (videoId: string) => void

  /**
   * Upload video to the server
   */
  uploadVideo?: (file: any, fileName: string, thumbnail: Blob) => any

  /**
   * Close video gallery
   */
  close: () => void

  /**
   * List of video in video gallery
   */
  videos?: List<VideoFile>

  /**
   * Show error message
   */
  showError?: (message: string) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
