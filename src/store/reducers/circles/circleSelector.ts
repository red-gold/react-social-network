import { Map } from 'immutable';
import { createSelector } from 'reselect';

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