// - Import react components
import {Reducer, Action} from "redux";

// - Import action types
import {AuthorizeActionType} from 'constants/authorizeActionType'


/**
 * Default state
 */
var defaultState = {
  uid: 0,
  authed: false,
  updatePassword: false,
  guest:false
}

/**
 * Default post state interface
 * 
 * @export
 * @interface IAuthorizeState
 */
export interface IAuthorizeState  {
  uid: number,
  authed: Boolean,
  updatePassword: Boolean,
  guest:Boolean
}

/**
 *  Default authorize action interface
 * 
 * @export
 * @interface IAuthorizeAction
 */
export interface IAuthorizeAction  {
  payload: any,
  type: AuthorizeActionType

}

/**
 *  Default authorize reducer state
 * 
 * @export
 * @class DefaultAuthorizeState
 * @implements {IAuthorizeState}
 */
export class DefaultAuthorizeState implements IAuthorizeState{
  uid: number = 0;
  authed: Boolean = false;
  updatePassword: Boolean = false;
  guest: Boolean = false;

}

/**
 *  Authorize reducer
 * @param {object} state 
 * @param {object} action 
 */
export var authorizeReducer = (state : IAuthorizeState = new DefaultAuthorizeState(), action: IAuthorizeAction) =>{
  const { payload } = action;
  switch (action.type) {
    case AuthorizeActionType.LOGIN:
      return{
        ...state,
        uid: payload.uid,
        authed: true,
        guest:false
      }
    case AuthorizeActionType.LOGOUT:
    return{
      ...state,
      uid: 0,
      authed: false,
      guest:true
    }

    case AuthorizeActionType.SIGNUP:
      return{
        ...state,
        uid: payload.userId
      }
    case AuthorizeActionType.UPDATE_PASSWORD:
    return{
      ...state,
      updatePassword: payload.updatePassword
    }
    default:
      return state

  }

}
