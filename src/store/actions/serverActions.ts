// - Import action types
import { ServerActionType } from 'constants/serverActionType'

// - Import domain

// - Import actions
import { ServerRequestModel } from 'src/models/server/serverRequestModel'
import { SocialError } from 'src/core/domain/common/socialError'

/**
 * Add a request
 * @param {Request} request
 */
export const sendRequest = (request: ServerRequestModel) => {
  return { type: ServerActionType.ADD_REQUEST, payload: {request} }

}

/**
 * delete a request
 */
export const deleteRequest = (requestId: string) => {
  return { type: ServerActionType.DELETE_REQUEST, payload: {requestId} }

}

/**
 * Update request stattus ti successful
 */
export const okRequest = (requestId: string) => {
  return { type: ServerActionType.OK_REQUEST, payload: {requestId} }

}

/**
 * Set error request
 */
export const errorRequest = (requestId: string, error: SocialError) => {
  return { type: ServerActionType.ERROR_REQUEST, payload: {requestId, error} }

}

/**
 * Clear all data
 */
export const clearAllrequests = () => {
  return { type: ServerActionType.CLEAR_ALL_DATA_REQUEST }
}
