// - Import action types
import { GlobalActionType } from 'constants/globalActionType'

import { GlobalState } from './GlobalState'
import { IGlobalAction } from './IGlobalAction'
import { Map, fromJS } from 'immutable'

/**
 * Progress change
 */
const progressChange = (state: Map<string, any> , payload: any) => {
 return state
        .setIn(['progress', 'percent'], payload.percent)
        .setIn(['progress', 'visible'], payload.visible)
}

/**
 * Progress change by keu
 */
const progressChangeWithKey = (state: Map<string, any> , payload: any) => {
  return state
        .setIn(['progress', payload.progressKey, 'percent'], payload.percent)
        .setIn(['progress', payload.progressKey, 'visible'], payload.visible)
        .setIn(['progress', payload.progressKey, 'meta'], payload.meta)

}

/**
 * Show global message
 */
const showGlobalMessage = (state: Map<string, any> , action: any) => {
  const {payload} = action
  const { message} = payload
  return state
  .set('message', message)
  .set('messageOpen', true)
} 

/**
 * Show message by reference
 */
const showMessageByReference = (state: Map<string, any> , action: any) => {
  const {payload} = action
  const {refrenceKey, message} = payload
  if (refrenceKey && refrenceKey !== undefined && refrenceKey !== null) {
    return state
      .setIn(['messageByRef', refrenceKey], message)
      .setIn(['messageByRefeOpen', refrenceKey], true)
  }
  return state
} 

/**
 * Hide global message
 */
const hideGlobalMessage = (state: Map<string, any> , action: any) => {
  return state
  .set('message', '')
  .set('messageOpen', false)
} 

/**
 * Hide message by reference
 */
const hideMessageByReference = (state: Map<string, any> , action: any) => {
  const {payload} = action
  const {refrenceKey} = payload
  if (refrenceKey && refrenceKey !== undefined && refrenceKey !== null) {
    return state
      .setIn(['messageByRef', refrenceKey], '')
      .setIn(['messageByRefeOpen', refrenceKey], false)
  }
  return state
} 

/**
 * Global reducer
 */
export const globalReducer = (state: Map<string, any> = Map(new GlobalState()), action: IGlobalAction) => {
  const { payload } = action
  switch (action.type) {
    case GlobalActionType.PROGRESS_CHANGE: return progressChange(state, payload)

    case GlobalActionType.PROGRESS_CHANGE_WITH_KEY: return progressChangeWithKey(state, payload)

    case GlobalActionType.DEFAULT_DATA_DISABLE:
      return state
        .set('defaultLoadDataStatus', false)

    case GlobalActionType.DEFAULT_DATA_ENABLE:
      return state
        .set('defaultLoadDataStatus', true)

    case GlobalActionType.SHOW_MESSAGE_GLOBAL: return showGlobalMessage(state, action)

    case GlobalActionType.HIDE_MESSAGE_GLOBAL: return hideGlobalMessage(state, action)

    case GlobalActionType.SHOW_MESSAGE_BY_REFERENCE: return showMessageByReference(state, action)

    case GlobalActionType.HIDE_MESSAG_BY_REFERENCE: return hideMessageByReference(state, action)

    case GlobalActionType.SET_HEADER_TITLE:
      return state
        .set('headerTitle', action.payload)

    case GlobalActionType.OPEN_DIALOG:
      return state
        .setIn(['dialog', action.payload.type, 'open'], true)

    case GlobalActionType.CLOSE_DIALOG:
      return state
        .setIn(['dialog', action.payload.type, 'open'], false)

    case GlobalActionType.SHOW_SEND_FEEDBACK:
      return state
        .set('sendFeedbackStatus', true)

    case GlobalActionType.HIDE_SEND_FEEDBACK:
      return state
        .set('sendFeedbackStatus', false)

    case GlobalActionType.HIDE_TOP_LOADING:
      const queueTopLoading = Number(state.get('topLoadingQueue')) > 0 ? (Number(state.get('topLoadingQueue')) - 1) : 0
      return state
        .set('topLoadingQueue', queueTopLoading)
        .set('showTopLoading', (queueTopLoading > 0 ? true : false))

    case GlobalActionType.SHOW_TOP_LOADING:
      return state
        .set('topLoadingQueue', (Number(state.get('topLoadingQueue')) + 1))
        .set('showTopLoading', true)

    case GlobalActionType.HIDE_MASTER_LOADING:
      const queueMasterLoading = Number(state.get('masterLoadingQueue')) > 0 ? (Number(state.get('masterLoadingQueue')) - 1) : 0
      return state
        .set('masterLoadingQueue', queueMasterLoading)
        .set('showMasterLoading', (queueMasterLoading > 0 ? true : false))

    case GlobalActionType.SHOW_MASTER_LOADING:
      return state
        .set('masterLoadingQueue', Number(state.get('masterLoadingQueue')) + 1)
        .set('showMasterLoading', true)

    case GlobalActionType.TEMP:
      return state
        .mergeIn(['temp', 'caller'], fromJS([payload.caller]))

    case GlobalActionType.CLEAR_ALL_GLOBAL:
      return state
        .set('sendFeedbackStatus', false)
    default:
      return state
  }

}
