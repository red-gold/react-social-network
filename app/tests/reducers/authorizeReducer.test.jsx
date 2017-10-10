// - Import react components
let expect = require('expect')
let df = require('deep-freeze-strict')
import { authorizeReducer } from 'authorizeReducer'

// - Import action types
import * as types from 'actionTypes'


/**
 * Default state
 */
let defaultState = {
    uid: 0,
    authed: false,
    updatePassword: false,
    guest: false
}

describe('authorizeReducer', () => {
    it('should set user in login state', () => {
        let action = {
            type: types.LOGIN,
            uid: 'user12345'
        }
        let res = authorizeReducer(df(defaultState), df(action))

        expect(res.uid).toEqual(action.uid)
        expect(res.authed).toEqual(true)
        expect(res.guest).toEqual(false)
    })

    it('should set user in logout state', () => {
        let action = {
            type: types.LOGOUT
        }
        let res = authorizeReducer(df(defaultState), df(action))

        expect(res.uid).toEqual(0)
        expect(res.authed).toEqual(false)
        expect(res.guest).toEqual(true)
    })

    it('should set uid in signup', () => {
        let action = {
            type: types.SIGNUP,
            uid: 'user12345'
        }
        let res = authorizeReducer(df(defaultState), df(action))

        expect(res.uid).toEqual(action.uid)
    })

        it('should update password', () => {
        let action = {
            type: types.UPDATE_PASSWORD,
            updatePassword: 'p@55w0rd'
        }
        let res = authorizeReducer(df(defaultState), df(action))

        expect(res.updatePassword).toEqual(action.updatePassword)
    })

})
