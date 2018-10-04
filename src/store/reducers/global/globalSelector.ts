import {Map} from 'immutable'
import { DialogType } from 'models/common/dialogType'
import { createSelector } from 'reselect'

const getCaller = (state: Map<string, any>) => {
    return state.getIn(['global', 'temp', 'caller'])
}

const getProgress = (state: Map<string, any>) => {
    return state.getIn(['global', 'progress'])
}

const getDialogState = (state: Map<string, any>, props: {type: DialogType}) => {
    return state.getIn(['global', 'dialog', props.type, 'open'], false)
}

/****************************
 * Selectors
 ***************************/
const selectDialogState = () => {
    return createSelector(
        [getDialogState],
        (state) => state
    )
}

const selectProgress = () => {
    return createSelector(
        [getProgress],
        (progress) => progress
    )
}

export const globalSelector = {
    getCaller,
    selectDialogState,
    selectProgress
}