import { List, Map } from 'immutable'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestModel } from 'models/server'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

/**
 * Creat get stream server requesta
 */
const createLoginRequest = (email: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.AuthLogin, email)
  return new ServerRequestModel(
      ServerRequestType.AuthLogin,
      requestId,
      '',
      ServerRequestStatusType.Sent
  )
}

/**
 * Store token id
 */
const storeTokenId = (tokenId: string) => {
  localStorage.setItem('firebase.token', tokenId)
}

/**
 * Get token id
 */
const getTokenId = () => {
  localStorage.getItem('firebase.token')
}

export const AuthAPI = {
  createLoginRequest,
  storeTokenId,
  getTokenId
}
