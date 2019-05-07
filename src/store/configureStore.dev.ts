// - Import external components
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware, { END } from 'redux-saga'
import { createLogger } from 'redux-logger'
import { rootReducer } from 'store/reducers'
import { fromJS, Map } from 'immutable'
import DevTools from './devTools'
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
import { offline } from '@redux-offline/redux-offline'
import defaultConfig from '@redux-offline/redux-offline/lib/defaults'
// replacing redux-offline defaults with immutable* counterparts
import { persist, persistAutoRehydrate, offlineStateLens } from 'redux-offline-immutable-config'

import config from 'src/config'
// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Logger option for transforming immutable js
const logger = createLogger({
  stateTransformer: (state: Map<string, any>) => {

    return state.toJS()
  }
})

const sagaMiddleware = createSagaMiddleware()
// - initial state
let initialState = {

}

// - Config and create store of redux
const composeEnhancers = composeWithDevTools({
  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
})

const persistOptions = {}
const persistCallback = () => {
  console.log('rehydration completed')
}

const offlineConfig = {
  ...defaultConfig,
  persist,
  persistAutoRehydrate,
  persistOptions,
  persistCallback,
  offlineStateLens
}
let store: Store<any>
if (config.settings.enabledOffline) {
  store = createStore(rootReducer(history), fromJS(initialState), composeEnhancers(
    applyMiddleware(logger,thunk, routerMiddleware(history), sagaMiddleware), offline(offlineConfig)
  ))
} else {
  store = createStore(rootReducer(history), fromJS(initialState), composeEnhancers(
    applyMiddleware(logger,thunk, routerMiddleware(history), sagaMiddleware)
  ))
}

export default {store, runSaga: sagaMiddleware.run, close: () => store.dispatch(END), history}
