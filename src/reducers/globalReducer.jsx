// - Import action types
import * as types from 'actionTypes'


/**
 * Default state
 */
var defaultState = {
  progress: {
    percent: 0,
    visible: false
  },
  loadingStatus: true,
  defaultLoadDataStatus: false,
  messageOpen: false,
  message: '',
  sidebarMainStyle: {},
  sidebarStyle: { width: "210px" },
  sidebarClass: "",
  sidebarOpen: (window.innerWidth > 750) ? true : false,
  windowWidth: 0,
  windowHeight: 0,
  overSidebarStatus: false,
  onResizeOpenSidebar: false,
  sidebarAuto: false,
  headerTitle: '',
  editProfileOpen: false,
  showTopLoading: false,
  topLoadingQueue: 0,
  temp: {}

}


/**
 * Global reducer
 * @param {object} state 
 * @param {object} action 
 */
export const globalReducer = (state = defaultState, action) => {
  const { payload } = action
  switch (action.type) {
    case types.PROGRESS_CHANGE:
      return {
        ...state,
        progress: {
          ...state.progress,
          percent: payload.percent,
          visible: payload.visible
        }
      }
    case types.DEFAULT_DATA_DISABLE:
      return {
        ...state,
        defaultLoadDataStatus: false
      }
    case types.DEFAULT_DATA_ENABLE:
      return {
        ...state,
        defaultLoadDataStatus: true
      }
    case types.SHOW_ERROR_MESSAGE_GLOBAL:
      return {
        ...state,
        message: action.payload,
        messageOpen: true
      }
    case types.SHOW_NORMAL_MESSAGE_GLOBAL:
      return {
        ...state,
        message: action.payload,
        messageOpen: true
      }
    case types.SHOW_SEND_REQUEST_MESSAGE_GLOBAL:
      return {
        ...state,
        message: "Request has been sent",
        messageOpen: true
      }
    case types.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL:
      return {
        ...state,
        message: "Your request has processed successfuly",
        messageOpen: true
      }
    case types.HIDE_MESSAGE_GLOBAL:
      return {
        ...state,
        message: '',
        messageOpen: false,
        messageColor: ''
      }
    case types.SET_HEADER_TITLE:
      return {
        ...state,
        headerTitle: action.payload
      }
    case types.HIDE_TOP_LOADING:
      const queue = state.topLoadingQueue > 0 ? (state.topLoadingQueue - 1) : 0
      return {
        ...state,
        topLoadingQueue: queue,
        showTopLoading: (queue > 0 ? true : false)

      }
    case types.SHOW_TOP_LOADING:
      return {
        ...state,
        topLoadingQueue: (state.topLoadingQueue + 1),
        showTopLoading: true
      }
    case types.TEMP:
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
