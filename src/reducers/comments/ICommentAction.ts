
import {CommentActionType} from 'constants/commentActionType'

/**
 *  Comment action interface
 * 
 * @export
 * @interface ICommentAction
 */
export interface ICommentAction  {
    payload: any
    type: CommentActionType
  
  }