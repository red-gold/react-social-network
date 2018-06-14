import { ServerRequestType } from 'constants/serverRequestType'
import StringAPI from 'api/StringAPI'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

export class ServerRequestModel {
  constructor (
    public type: ServerRequestType,
    public id: string,
    public metadata: string,
    public status: ServerRequestStatusType = ServerRequestStatusType.Sent

  ) {}

  /**
   * Get unique key for request
   */
  getKey (): string {
    return StringAPI.createServerRequestId(this.type, this.id)
  }

}
