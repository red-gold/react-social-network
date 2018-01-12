import { ServerActionType } from 'constants/serverActionType'

/**
 *  Server action interface
 *
 * @export
 * @interface IServerAction
 */
export interface IServerAction {
  payload: any,
  type: ServerActionType

}
