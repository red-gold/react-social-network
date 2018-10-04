import { Post } from 'core/domain/posts'
import {Map} from 'immutable'
import { Album } from 'core/domain/imageGallery/album'

export interface IPostWriteComponentProps {

    /**
     * If it's true post writing page will be open
     */
  open: boolean
    /**
     * Recieve request close function
     */
  onRequestClose: () => void
    /**
     * Post write style
     */
  style?: {}
    /**
     * If it's true, post will be in edit view
     */
  edit?: boolean
    /**
     * The text of post in editing state
     */
  text?: string
    /**
     * The image of post in editing state
     */
  image?: string
    /**
     * If post state is editing this id sould be filled with post identifier
     */
  id?: string

  /**
   * The post has image {true} or not {false}
   */
  postImageState?: boolean

  /**
   * User avatar address
   */
  ownerAvatar?: string

  /**
   * The post owner name
   */
  ownerDisplayName?: string

  /**
   * Post model
   */
  postModel?: Map<string, any>

  /**
   * Save a post
   */
  post?: (post: Post, callback: Function) => any

  /**
   * Update a post
   */
  update?: (post: Map<string, any>, callback: Function) => any

  /**
   * Open album
   */
  openAlbum?: () => any

  /**
   * Close album
   */
  closeAlbum?: () => any

  /**
   * Progress change
   */
  progress?: Map<string, any>

  /**
   * Whether album dialog is open
   */
  albumDialogOpen?: boolean
  
  /**
   * Handle upload image
   */
  uploadImage?: (image: any, imageName: string) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
