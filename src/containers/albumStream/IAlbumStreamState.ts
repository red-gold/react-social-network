import { Post } from 'src/core/domain/posts'
import {Map} from 'immutable'

export interface IAlbumStreamState {

  /**
   * If there is more post to show
   */
  hasMorePosts: boolean

  /**
   * The title of top bar
   */
  homeTitle: string

  /**
   * Posts for stream
   */
  posts: Array<Post[]>

  /**
   * Posts for stream
   */
  prevPosts: Map<string, Map<string, any>>

  /**
   * The images from album
   */
  pictureDialogImages: string[]

  /**
   * Wether picture dialog is open
   */
  picutreDialogOpen: boolean
}
