import StringAPI from 'api/StringAPI';
import { ServerRequestType } from 'constants/serverRequestType';
import { ServerRequestModel } from 'models/server';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';

/**
 * Create login server request
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
 * Create signup server request
 */
const createSignupRequest = (email: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.AuthSignup, email)
  return new ServerRequestModel(
      ServerRequestType.AuthSignup,
      requestId,
      '',
      ServerRequestStatusType.Sent
  )
}

/**
 * Store token id
 */
const storeTokenId = (tokenId: string) => {
  localStorage.setItem('red-gold.scure.token', tokenId)
}

/**
 * Get token id
 */
const getTokenId = () => {
  localStorage.getItem('red-gold.scure.token')
}

export const AuthAPI = {
  createLoginRequest,
  createSignupRequest,
  storeTokenId,
  getTokenId
}
