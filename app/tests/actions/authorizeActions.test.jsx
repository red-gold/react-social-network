// - Import react components
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
var expect = require('expect')

import firebase, {firebaseRef} from 'app/firebase'
var authorizeActions = require('authorizeActions')
import * as types from 'actionTypes'

var createMockStore = configureMockStore([thunk])

describe('AuthorizeActions', () => {
  it('should generate login action', () => {
    const uid = 'UID123456'
    var action = {
      type: types.LOGIN,
      authed: true, 
      uid
    }
    var res = authorizeActions.login(action.uid)

    expect(res).toEqual(action);
  })

  it('should generate logout action', () => {
    var action = {
      type: types.LOGOUT
    }
    var res = authorizeActions.logout()

    expect(res).toEqual(action)
  })

})