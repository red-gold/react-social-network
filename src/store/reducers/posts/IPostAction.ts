import { PostActionType } from 'constants/postActionType'

/**
 * Post action interface
 *
 * @export
 * @interface IPostAction
 */
export interface IPostAction {
  payload: any,
  type: PostActionType

}
