import { Post } from 'core/domain/posts'

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
  avatar?: string

  /**
   * User name
   *
   * @type {string}
   * @memberof IPostWriteComponentProps
   */
  name?: string

  /**
   * Post image full path
   *
   * @type {string}
   * @memberof IPostWriteComponentProps
   */
  imageFullPath?: string

  /**
   * Comment on the post is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPostWriteComponentProps
   */
  disableComments?: boolean

  /**
   * Sharing on a post is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPostWriteComponentProps
   */
  disableSharing?: boolean

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
  update?: (post: Post, callback: Function) => any
}
