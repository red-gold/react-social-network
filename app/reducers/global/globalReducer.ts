// - Import action types
import { GlobalActionType } from 'constants/globalActionType';


import { GlobalState } from "./GlobalState";
import { IGlobalAction } from "./IGlobalAction";


/**
 * Global reducer
 * @param {object} state 
 * @param {object} action 
 */
export const globalReducer = (state: GlobalState = new GlobalState(), action: IGlobalAction) => {
  const { payload } = action
  switch (action.type) {
    case GlobalActionType.PROGRESS_CHANGE:
      return {
        ...state,
        progress: {
          ...state.progress,
          percent: payload.percent,
          visible: payload.visible
        }
      }
    case GlobalActionType.DEFAULT_DATA_DISABLE:
      return {
        ...state,
        defaultLoadDataStatus: false
      }
    case GlobalActionType.DEFAULT_DATA_ENABLE:
      return {
        ...state,
        defaultLoadDataStatus: true
      }
    case GlobalActionType.SHOW_ERROR_MESSAGE_GLOBAL:
      return {
        ...state,
        message: action.payload,
        messageOpen: true
      }
    case GlobalActionType.SHOW_NORMAL_MESSAGE_GLOBAL:
      return {
        ...state,
        message: action.payload,
        messageOpen: true
      }
    case GlobalActionType.SHOW_SEND_REQUEST_MESSAGE_GLOBAL:
      return {
        ...state,
        message: "Request has been sent",
        messageOpen: true
      }
    case GlobalActionType.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL:
      return {
        ...state,
        message: "Your request has processed successfuly",
        messageOpen: true
      }
    case GlobalActionType.HIDE_MESSAGE_GLOBAL:
      return {
        ...state,
        message: '',
        messageOpen: false,
        messageColor: ''
      }
    case GlobalActionType.SET_HEADER_TITLE:
      return {
        ...state,
        headerTitle: action.payload
      }
    case GlobalActionType.HIDE_TOP_LOADING:
      const queue = state.topLoadingQueue > 0 ? (state.topLoadingQueue - 1) : 0
      return {
        ...state,
        topLoadingQueue: queue,
        showTopLoading: (queue > 0 ? true : false)

      }
    case GlobalActionType.SHOW_TOP_LOADING:
      return {
        ...state,
        topLoadingQueue: (state.topLoadingQueue + 1),
        showTopLoading: true
      }
    case GlobalActionType.TEMP:
      return {
        ...state,
        temp: {
          ...state.temp,
          ...payload
        }
      }

    default:
      return state
  }



}
