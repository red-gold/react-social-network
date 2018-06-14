import { UserActionType } from 'constants/userActionType'

/**
 *  User action interface
 *
 * @export
 * @interface IUserAction
 */
export interface IUserAction {
  payload: any,
  type: UserActionType

}
