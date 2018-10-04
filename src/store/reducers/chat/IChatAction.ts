import { ChatActionType } from 'constants/chatActionType'

/**
 *  Chat action interface
 */
export interface IChatAction {
  payload: any,
  type: ChatActionType

}
