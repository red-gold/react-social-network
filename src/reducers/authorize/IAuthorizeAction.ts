// - Import action types
import { AuthorizeActionType } from 'constants/authorizeActionType'

/**
 *  Authorize action interface
 *
 * @export
 * @interface IAuthorizeAction
 */
export interface IAuthorizeAction {
  payload: any
  type: AuthorizeActionType

}
