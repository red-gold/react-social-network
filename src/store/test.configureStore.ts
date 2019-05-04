// - Import external components
import { routerMiddleware } from 'connected-react-router/immutable';
import {createBrowserHistory} from 'history';
import { fromJS, Map } from 'immutable';
import jwtDecode from 'jwt-decode';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory()

// Logger option for transforming immutable js
const logger = createLogger({
  stateTransformer: (state: Map<string, any>) => {

    return state.toJS()
  }
})

const sagaMiddleware = createSagaMiddleware()
const token = localStorage.getItem('red-gold.scure.token')
let uid = ''
let authed = false
if (token) {
  uid = (jwtDecode(token) as any)['user_id']
  authed = true
}
// - initial state
let initialState = {
  authorize: {
    authed: authed,
    guest: !authed ,
    uid
  }
}

// - Config and create store of redux
const composeEnhancers = composeWithDevTools({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
let store: Store<any> = createStore(rootReducer(history), fromJS(initialState), composeEnhancers(
  applyMiddleware(logger,thunk, routerMiddleware(history), sagaMiddleware)
))

export default {store, runSaga: sagaMiddleware.run, close: () => store.dispatch(END), history}
