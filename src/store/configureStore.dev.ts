// - Import external components
import * as redux from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import { rootReducer } from 'reducers'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// - Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const logger = createLogger()

// - initial state
let initialState = {

}

// - Config and create store of redux
let store: redux.Store<any> = redux.createStore(rootReducer, initialState, redux.compose(
  redux.applyMiddleware(logger,thunk,middleware),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
))

export default {store, history}
