// - Import image gallery action types
import { GlobalActionType } from 'constants/globalActionType'

// - Import actions
import * as serverActions from 'actions/serverActions'

import { ICommonService } from 'core/services/common/ICommonService'
import { provider } from 'src/socialEngine'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { Feed, SocialError } from 'core/domain/common'
import { ServerRequestType } from 'constants/serverRequestType'
import StringAPI from 'api/StringAPI'
import { ServerRequestModel } from 'models/server'
import { ServerRequestStatusType } from 'actions/serverRequestStatusType'

/**
 * Get service providers
 */
const commonService: ICommonService = provider.get<ICommonService>(SocialProviderTypes.CommonService)

/**
 * Add a normal feed
 */
export let dbSendFeed = (newFeed: Feed) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid

    // Set server request status to {Sent}
    const feedbackRequest = createFeedbackRequest(uid)
    dispatch(serverActions.sendRequest(feedbackRequest))

    return commonService.addFeed(newFeed).then(() => {
      // Set server request status to {OK}
      feedbackRequest.status = ServerRequestStatusType.OK
      dispatch(serverActions.sendRequest(feedbackRequest))
    })
      .catch((error: SocialError) => {
        dispatch(showErrorMessage(error.message))

        // Set server request status to {Error}
        feedbackRequest.status = ServerRequestStatusType.Error
        dispatch(serverActions.sendRequest(feedbackRequest))
      })
  }
}

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

// - Show notification of request
export const showNotificationRequest = () => {
  return {
    type: GlobalActionType.SHOW_SEND_REQUEST_MESSAGE_GLOBAL
  }
}

// - Show notification of success
export const showNotificationSuccess = () => {
  return {
    type: GlobalActionType.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL
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
 * Show error message
 * @param {string} message
 */
export const showErrorMessage = (message: string) => {
  return {
    type: GlobalActionType.SHOW_ERROR_MESSAGE_GLOBAL,
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
    type: GlobalActionType.CLEAR_TEMP
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
