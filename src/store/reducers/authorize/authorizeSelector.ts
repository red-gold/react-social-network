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

const selectCurrentUser = () => {
    return createSelector(
        [getCurrentUser],
        (currentUser) => currentUser
    )
}

export const authorizeSelector = {
    getCurrentUser,
    getAuthedUser,
    selectCurrentUser
}