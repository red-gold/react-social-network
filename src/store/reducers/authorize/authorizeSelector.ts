import {Map} from 'immutable'
import { userSelector } from 'store/reducers/users/userSelector'
import { createSelector } from 'reselect'

const getCurrentUser = (state: Map<any, string>) => {
    const uid = state.getIn(['authorize', 'uid'])
    return userSelector.getUserProfileById(state, {userId: uid})
}

const getAuthedUser = (state: Map<any, string>) => {
    return state.getIn(['authorize'])
}

const getSignupStep = (state: Map<any, string>) => {
    return state.getIn(['authorize', 'ui', 'signupStep'], 0)
}

const getUserRegisterToken = (state: Map<any, string>) => {
    return state.getIn(['authorize', 'ui', 'registerToken'], '')
}

const selectCurrentUser = () => {
    return createSelector(
        [getCurrentUser],
        (currentUser) => currentUser
    )
}

const selectSignupStep = () => {
    return createSelector(
        [getSignupStep],
        (step) => step
    )
}

const selectUserRegisterToken = () => {
    return createSelector(
        [getUserRegisterToken],
        (token) => token
    )
}

export const authorizeSelector = {
    getCurrentUser,
    getAuthedUser,
    getSignupStep,
    getUserRegisterToken,
    selectCurrentUser,
    selectSignupStep,
    selectUserRegisterToken
}