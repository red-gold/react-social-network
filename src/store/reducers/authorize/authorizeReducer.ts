// - Import react components
import { Reducer, Action } from 'redux'

// - Import action types
import { AuthorizeActionType } from 'constants/authorizeActionType'

import { IAuthorizeAction } from './IAuthorizeAction'
import { AuthorizeState } from './AuthorizeState'
import { Map } from 'immutable'

/**
 *  Authorize reducer
 * @param {object} state
 * @param {object} action
 */
export let authorizeReducer = (state = Map(new AuthorizeState() as any), action: IAuthorizeAction) => {
  const { payload } = action
  switch (action.type) {
    case AuthorizeActionType.LOGIN:
    return state.update((value) => {
      return payload
    })

    case AuthorizeActionType.LOGOUT:
      return state
        .set('uid', 0)
        .set('authed', false)
        .set('guest', true)
        .set('isVerifide', false)
    case AuthorizeActionType.SIGNUP:
      return state
      .set('uid', payload.userId)
    case AuthorizeActionType.SET_USER_REGISTER_TOKEN:
      return state
      .set('registerToken', payload.token)
    case AuthorizeActionType.UPDATE_PASSWORD:
      return state
    default:
      return state

  }

}
