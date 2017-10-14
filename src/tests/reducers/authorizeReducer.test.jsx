// - Import react components
var expect = require('expect')
var df = require('deep-freeze-strict')
import { authorizeReducer } from 'authorizeReducer'

// - Import action types
import * as types from 'actionTypes'


/**
 * Default state
 */
var defaultState = {
    uid: 0,
    authed: false,
    updatePassword: false,
    guest: false
}

describe('authorizeReducer', () => {
    it('should set user in login state', () => {
        var action = {
            type: types.LOGIN,
            uid: 'user12345'
        };
        var res = authorizeReducer(df(defaultState), df(action));

        expect(res.uid).toEqual(action.uid)
        expect(res.authed).toEqual(true)
        expect(res.guest).toEqual(false)
    })

    it('should set user in logout state', () => {
        var action = {
            type: types.LOGOUT
        };
        var res = authorizeReducer(df(defaultState), df(action));

        expect(res.uid).toEqual(0)
        expect(res.authed).toEqual(false)
        expect(res.guest).toEqual(true)
    })

    it('should set uid in signup', () => {
        var action = {
            type: types.SIGNUP,
            uid: 'user12345'
        };
        var res = authorizeReducer(df(defaultState), df(action));

        expect(res.uid).toEqual(action.uid)
    })

        it('should update password', () => {
        var action = {
            type: types.UPDATE_PASSWORD,
            updatePassword: 'p@55w0rd'
        };
        var res = authorizeReducer(df(defaultState), df(action));

        expect(res.updatePassword).toEqual(action.updatePassword)
    })

})
