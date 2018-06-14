import {Map} from 'immutable'
const getCurrentUser = (state: Map<any, string>) => {
    const uid = state.getIn(['authorize', 'uid'])
    return state.getIn(['user', 'info', uid])
}

export const authorizeSelector = {
    getCurrentUser
}