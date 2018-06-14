
export interface ICommentComponentState {

  /**
   * Initialt text comment
   *
   * @type {string}
   * @memberof ICommentComponentProps
   */
  initialText?: string

  /**
   * Initialt text comment
   *
   * @type {string}
   * @memberof ICommentComponentProps
   */
  text: string

  /**
   * Comment is in edit state {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICommentComponentState
   */
  editDisabled: boolean

  /**
   * Current user is the post owner {true} or not falses
   *
   * @type {boolean}
   * @memberof ICommentComponentState
   */
  isPostOwner: boolean

  /**
   * Display comment {true} or not {false}
   *
   * @type {boolean}
   * @memberof ICommentComponentState
   */
  display?: boolean

  /**
   * Wheter comment menu is open
   */
  openMenu?: boolean

  /**
   * Anchor element
   */
  anchorEl: any
}
