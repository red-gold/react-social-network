// - Import external components
import * as redux from 'redux'
import thunk from 'redux-thunk'
import {routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {createLogger} from 'redux-logger';

// - Import reducers
import {imageGalleryReducer} from 'reducers/imageGalleryReducer'
import {postReducer} from 'reducers/postReducer'
import {commentReducer} from 'reducers/commentReducer'
import {voteReducer} from 'reducers/voteReducer'
import {authorizeReducer} from 'reducers/authorizeReducer'
import {globalReducer} from 'reducers/globalReducer'
import {userReducer} from 'reducers/userReducer'
import {circleReducer} from 'reducers/circleReducer'
import {notifyReducer} from 'reducers/notifyReducer'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// - Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const logger = createLogger()

// - Reducers
let reducer = redux.combineReducers({
  imageGallery: imageGalleryReducer,
  post: postReducer,
  circle: circleReducer,
  comment: commentReducer,
  vote: voteReducer,
  authorize: authorizeReducer,
  router: routerReducer,
  user: userReducer,
  notify:notifyReducer,
  global: globalReducer
})

// - initial state
var initialState = {


}

// - Config and create store of redux
var store : redux.Store<{}>  = redux.createStore(reducer, initialState, redux.compose(
  redux.applyMiddleware(logger,thunk,middleware),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f:any) => f
))

export default store
