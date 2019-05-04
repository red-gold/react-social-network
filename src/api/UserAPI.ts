import StringAPI from 'api/StringAPI';
import { ServerRequestType } from 'constants/serverRequestType';
import { ServerRequestModel } from 'models/server';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';

/**
 * Creat user search request
 */
const createUserSearchRequest = (userId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.UserFetchRequest, userId)
  return new ServerRequestModel(
      ServerRequestType.UserFetchRequest,
      requestId,
      '',
      ServerRequestStatusType.Sent
  )
}

export const UserAPI = {
  createUserSearchRequest
}
