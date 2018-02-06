// - Import external components
import * as redux from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import { localeReducer as locale } from 'react-localize-redux'

// - Import reducers
import {
  imageGalleryReducer,
  postReducer,
  commentReducer,
  voteReducer,
  serverReducer,
  authorizeReducer,
  globalReducer,
  userReducer,
  circleReducer,
  notificationReducer
} from 'reducers'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// - Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const logger = createLogger()

// - Reducers
let reducer = redux.combineReducers({
  locale,
  imageGallery: imageGalleryReducer,
  post: postReducer,
  circle: circleReducer,
  comment: commentReducer,
  vote: voteReducer,
  server: serverReducer,
  authorize: authorizeReducer,
  router: routerReducer,
  user: userReducer,
  notify: notificationReducer,
  global: globalReducer
} as any)

// - initial state
let initialState = {

}

// - Config and create store of redux
let store: redux.Store<any> = redux.createStore(reducer, initialState, redux.compose(
  redux.applyMiddleware(logger,thunk,middleware),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
))

export default store
