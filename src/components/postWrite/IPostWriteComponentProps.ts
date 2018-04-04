import { Post } from 'core/domain/posts'
import {Map} from 'immutable'
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
   *
   * @type {boolean}
   * @memberof IPostWriteComponentProps
   */
  postImageState?: boolean

  /**
   * User avatar address
   *
   * @type {string}
   * @memberof IPostWriteComponentProps
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
   *
   * @memberof IPostWriteComponentProps
   */
  post?: (post: Post, callback: Function) => any

  /**
   * Update a post
   *
   * @memberof IPostWriteComponentProps
   */
  update?: (post: Map<string, any>, callback: Function) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
