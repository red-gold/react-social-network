import { ServerRequestModel } from 'src/models/server'

/**
 * Server state
 *
 * @export
 * @class ServerState
 */
export class ServerState {

    /**
     * The list of posts server
     * @memberof ServerState
     */
  request: {[requestId: string]: ServerRequestModel} | null = {}
}
