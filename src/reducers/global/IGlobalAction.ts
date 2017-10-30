import { GlobalActionType } from 'constants/globalActionType'

/**
 *  Global action interface
 *
 * @export
 * @interface IGlobalAction
 */
export interface IGlobalAction {
  payload: any,
  type: GlobalActionType

}
