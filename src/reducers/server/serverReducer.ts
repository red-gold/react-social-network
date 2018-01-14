// - Import react components
import _ from 'lodash'

// - Import action types
import { ServerActionType } from 'constants/serverActionType'

// Import domain

import { ServerState } from './ServerState'
import { IServerAction } from './IServerAction'
import { ServerRequestModel } from 'models/server/serverRequestModel'
import { ServerRequestStatusType } from 'actions/serverRequestStatusType'

/**
 * Server actions
 * @param {object} state
 * @param {object} action
 */
export let serverReducer = (state: ServerState = new ServerState(), action: IServerAction) => {
  let { payload } = action
  const request = (payload ? payload.request : {}) as ServerRequestModel
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case ServerActionType.ADD_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          [request.id]: {
            ...request
          }
        }
      }
    case ServerActionType.DELETE_REQUEST:
      let parsedRequests = {}
      Object.keys(state.request!).forEach((id) => {
        if (id !== request.id) {
          _.merge(parsedRequests, { [id]: { ...state.request![id] } })
        }

      })
      return {
        ...state,
        request: parsedRequests
      }

    case ServerActionType.ERROR_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          [request.id]: {
            ...state.request![request.id],
            status: ServerRequestStatusType.Error
          }
        }
      }

    case ServerActionType.OK_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          [request.id]: {
            ...state.request![request.id],
            status: ServerRequestStatusType.OK
          }
        }
      }

    case ServerActionType.CLEAR_ALL_DATA_REQUEST:
      return new ServerState()

    default:
      return state
  }
}
