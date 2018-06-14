// - Import external components
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware, { END } from 'redux-saga'
import { createLogger } from 'redux-logger'
import { rootReducer } from 'store/reducers'
import { fromJS, Iterable, Map } from 'immutable'
import DevTools from './devTools'
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
let store: Store<any> = createStore(rootReducer, fromJS(initialState), composeEnhancers(
  applyMiddleware(logger,thunk, routerMiddleware(history), sagaMiddleware)
))

export default {store, runSaga: sagaMiddleware.run, close: () => store.dispatch(END), history}
