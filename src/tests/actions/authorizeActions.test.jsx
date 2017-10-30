// - Import react components
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
let expect = require('expect')

import firebase, {firebaseRef} from 'src/firebaseClient'
let authorizeActions = require('authorizeActions')
import * as types from 'actionTypes'

let createMockStore = configureMockStore([thunk])

describe('AuthorizeActions', () => {
  it('should generate login action', () => {
    const uid = 'UID123456'
    let action = {
      type: types.LOGIN,
      authed: true, 
      uid
    }
    let res = authorizeActions.login(action.uid)

    expect(res).toEqual(action)
  })

  it('should generate logout action', () => {
    let action = {
      type: types.LOGOUT
    }
    let res = authorizeActions.logout()

    expect(res).toEqual(action)
  })

})