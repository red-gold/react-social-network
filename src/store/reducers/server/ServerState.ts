import { ServerRequestModel } from 'src/models/server'
import {Map} from 'immutable'

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
  request: Map<string, ServerRequestModel> = Map({})
}
