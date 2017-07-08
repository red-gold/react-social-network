// - Import action types
import * as types from 'actionTypes'


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
 *  Authorize reducer
 * @param {object} state 
 * @param {object} action 
 */
export var authorizeReducer = (state = defaultState, action) =>{
  switch (action.type) {
    case types.LOGIN:
      return{
        ...state,
        uid: action.uid,
        authed: true,
        guest:false
      }
    case types.LOGOUT:
    return{
      ...state,
      uid: 0,
      authed: false,
      guest:true
    }

    case types.SIGNUP:
      return{
        ...state,
        uid: action.uid
      }
    case types.UPDATE_PASSWORD:
    return{
      ...state,
      updatePassword: action.updatePassword
    }
    default:
      return state

  }

}
