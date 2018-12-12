// - Import external components
import * as redux from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware, { END } from 'redux-saga'
import { rootReducer } from 'store/reducers'
import { fromJS } from 'immutable'
import jwtDecode from 'jwt-decode'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
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
let store: redux.Store<any> = redux.createStore(rootReducer, fromJS(initialState), redux.compose(
  redux.applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware)
))

export default {store, runSaga: sagaMiddleware.run, close: () => store.dispatch(END), history}
