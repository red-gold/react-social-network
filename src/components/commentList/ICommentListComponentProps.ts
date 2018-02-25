import { Comment } from 'core/domain/comments'

export interface ICommentListComponentProps {

  /**
   * Ad dictionary of comment
   *
   * @type {{[commentId: string]: Comment}}
   * @memberof ICommentListComponentProps
   */
  comments: {[commentId: string]: Comment}

  /**
   * Comments editor status
   */
  commentsEditorStatus?: {[commentId: string]: boolean}

  /**
   * Current user is post the post owner {true} or not false
   *
   * @type {boolean}
   * @memberof ICommentListComponentProps
   */
  isPostOwner: boolean

  /**
   * The post identifier comments belong to
   */
  postId: string

  /**
   * Comment on the post is disabled {false} or not {true}
   *
   * @type {boolean}
   * @memberof ICommentListComponentProps
   */
  disableComments: boolean

  /**
   * Styles
   */
  classes?: any
}
