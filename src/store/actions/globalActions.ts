// - Import image gallery action types
import { GlobalActionType } from 'constants/globalActionType'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { Map } from 'immutable'

// - Import actions
import * as serverActions from 'store/actions/serverActions'

import { ICommonService } from 'src/core/services/common/ICommonService'
import { provider } from 'src/socialEngine'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { Feed, SocialError } from 'src/core/domain/common'
import { ServerRequestType } from 'constants/serverRequestType'
import StringAPI from 'src/api/StringAPI'
import { ServerRequestModel } from 'src/models/server'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

/**
 * Get service providers
 */
const commonService: ICommonService = provider.get<ICommonService>(SocialProviderTypes.CommonService)

/**
 * Add a normal feed
 */
export let dbSendFeed = (newFeed: Feed) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any>  =  getState()
    let uid: string = state.getIn(['authorize', 'uid'])

    // Set server request status to {Sent}
    const feedbackRequest = createFeedbackRequest(uid)
    dispatch(serverActions.sendRequest(feedbackRequest))

    return commonService.addFeed(newFeed).then(() => {
      // Set server request status to {OK}
      feedbackRequest.status = ServerRequestStatusType.OK
      dispatch(serverActions.sendRequest(feedbackRequest))
    })
      .catch((error: SocialError) => {
        dispatch(showMessage(error.message))

        // Set server request status to {Error}
        feedbackRequest.status = ServerRequestStatusType.Error
        dispatch(serverActions.sendRequest(feedbackRequest))
      })
  }
}

// - Show notification of request
export const showNotificationRequest = () => {
  return (dispatch: Function, getState: Function) => {
    const state: Map<string, any> = getState()
    const translate =  getTranslate(state.get('locale'))
    return dispatch(showMessage(String(translate('common.sentRequestMessage'))))
  }
}

// - Show notification of success
export const showNotificationSuccess = () => {
  return (dispatch: Function, getState: Function) => {
    const state: Map<string, any>  = getState()
    const translate =  getTranslate(state.get('locale'))
    return dispatch(showMessage(String(translate('common.successfulRequestMessage'))))
  }
}

// - Internal request------------------

/**
 * Progress change
 */
export const progressChange = (percent: number, visible: Boolean) => {
  return {
    type: GlobalActionType.PROGRESS_CHANGE,
    payload: { percent, visible }
  }

}

/**
 * Default data loaded status will be true
 */
export const defaultDataEnable = () => {
  return {
    type: GlobalActionType.DEFAULT_DATA_ENABLE
  }
}

/**
 * Default data loaded status will be false
 * @param {boolean} status
 */
export const defaultDataDisable = () => {
  return {
    type: GlobalActionType.DEFAULT_DATA_DISABLE
  }
}

/**
 * Hide global message
 */
export const hideMessage = () => {
  hideTopLoading()
  return {
    type: GlobalActionType.HIDE_MESSAGE_GLOBAL
  }

}

/**
 * Show message
 * @param {string} message
 */
export const showMessage = (message: string) => {
  if (!message || message === '' || (message && message.trim() === '')) {
    message = 'Bad request'
  }
  return {
    type: GlobalActionType.SHOW_MESSAGE_GLOBAL,
    payload: message
  }

}

/**
 * Set header title
 */
export const setHeaderTitleOpt = (callerKey: string, payload: any) => {
  return (dispatch: any, getState: Function) => {
    switch (callerKey) {
      case 'profile':
        const userName = getState().user.info && getState().user.info[payload] ? getState().user.info[payload].fullName : ''
        dispatch(setHeaderTitle(userName))
        break
      default:
        break
    }

  }

}

/**
 * Set header title
 */
export const setHeaderTitle = (text: string) => {
  return {
    type: GlobalActionType.SET_HEADER_TITLE,
    payload: text
  }

}

/**
 * Open post write
 */
export const openPostWrite = () => {
  return {
    type: GlobalActionType.OPEN_POST_WRITE
  }

}

/**
 * Close post write
 */
export const closePostWrite = () => {
  return {
    type: GlobalActionType.CLOSE_POST_WRITE
  }

}

/**
 * Show top loading
 */
export const showTopLoading = () => {
  return {
    type: GlobalActionType.SHOW_TOP_LOADING
  }

}

/**
 * Hide top loading
 */
export const hideTopLoading = () => {
  return {
    type: GlobalActionType.HIDE_TOP_LOADING
  }

}

/**
 * Show master loading
 */
export const showMasterLoading = () => {
  return {
    type: GlobalActionType.SHOW_MASTER_LOADING
  }

}

/**
 * Show send feedback
 */
export const showSendFeedback = () => {
  return {
    type: GlobalActionType.SHOW_SEND_FEEDBACK
  }

}

/**
 * Hide send feedback
 */
export const hideSendFeedback = () => {
  return {
    type: GlobalActionType.HIDE_SEND_FEEDBACK
  }

}

/**
 * Hide master loading
 */
export const hideMasterLoading = () => {
  return {
    type: GlobalActionType.HIDE_MASTER_LOADING
  }

}

/**
 * Store temp data
 */
export const temp = (data: any) => {
  return {
    type: GlobalActionType.TEMP,
    payload: data
  }

}

/**
 * Clear temp data
 */
export const clearTemp = () => {
  return {
    type: GlobalActionType.CLEAR_ALL_GLOBAL
  }

}

// - Load data for guest
export const loadDataGuest = () => {
  // tslint:disable-next-line:no-empty
  return (dispatch: any, getState: Function) => {
  }

}

/**
 * Create send feedback serevr request model
 */
const createFeedbackRequest = (userId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CommonSendFeedback, userId)
  return new ServerRequestModel(
    ServerRequestType.CommonSendFeedback,
    requestId,
    '',
    ServerRequestStatusType.Sent
  )
}
