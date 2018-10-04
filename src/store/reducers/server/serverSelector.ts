import {Map} from 'immutable'
import { createSelector } from 'reselect'

/****************************
 * Get from store
 ***************************/
const getRequest = (state: Map<string, any>, props: {requestId: string}) => {
    return state.getIn(['server', 'request', props.requestId])
}

/****************************
 * Selectors
 ***************************/
const selectRequest = () => {
    return createSelector(
        [getRequest],
        (request) => request
    )
}

export const serverSelector = {
    getRequest,
    selectRequest
}