import {Map} from 'immutable'
import { createSelector } from 'reselect'
import { authorizeSelector } from 'store/reducers/authorize'

const getFollowingUsers = (state: Map<string, any>) => {
    return state.getIn(['circle', 'userTies'])
}

const selectFollowingIds = () => {
    return createSelector(
        [getFollowingUsers],
        (followingUsers: Map<string, any>) => followingUsers.keySeq()
            .toArray()   
    )
}

export const circleSelector = {
    getFollowingUsers,
    selectFollowingIds
}