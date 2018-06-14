// - Import react components
import _ from 'lodash'
import { Map } from 'immutable'

// - Import action types
import { ServerActionType } from 'constants/serverActionType'

// Import domain

import { ServerState } from './ServerState'
import { IServerAction } from './IServerAction'
import { ServerRequestModel } from 'src/models/server/serverRequestModel'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

/**
 * Server actions
 * @param {object} state
 * @param {object} action
 */
export let serverReducer = (state = Map(new ServerState()), action: IServerAction) => {
  let { payload } = action
  const request = (payload ? payload.request : {}) as ServerRequestModel
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case ServerActionType.ADD_REQUEST:
      return state
        .setIn(['request', request.id], request)

    case ServerActionType.DELETE_REQUEST:
      return state
        .deleteIn(['request', request.id])

    case ServerActionType.ERROR_REQUEST:
      return state
        .setIn(['request', request.id, 'status'], ServerRequestStatusType.Error)

    case ServerActionType.OK_REQUEST:
      return state
        .setIn(['request', request.id, 'status'], ServerRequestStatusType.OK)

    case ServerActionType.CLEAR_ALL_DATA_REQUEST:
      return Map(new ServerState())

    default:
      return state
  }
}
