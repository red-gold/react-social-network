// - Import react components
import {Reducer, Action} from 'redux'

// - Import action types
import {AuthorizeActionType} from 'constants/authorizeActionType'

import { IAuthorizeAction } from './IAuthorizeAction'
import { AuthorizeState } from './AuthorizeState'



/**
 *  Authorize reducer
 * @param {object} state 
 * @param {object} action 
 */
export let authorizeReducer = (state : AuthorizeState = new AuthorizeState(), action: IAuthorizeAction) =>{
  const { payload } = action
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
