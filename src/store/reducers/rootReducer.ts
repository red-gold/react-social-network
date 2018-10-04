import {
  combineReducers
} from 'redux-immutable'

// - Import reducers
import { authorizeReducer } from './authorize'
import { circleReducer } from './circles'
import { commentReducer } from './comments'
import { globalReducer } from './global'
import { imageGalleryReducer } from './imageGallery'
import { notificationReducer } from './notifications'
import { postReducer } from './posts'
import { userReducer } from './users'
import { voteReducer } from './votes'
import { serverReducer } from './server'
import { userSettingReducer } from './userSetting'
import { chatReducer } from './chat'
import { routerReducer, routerMiddleware } from 'react-router-redux'

// - Reducers
export const rootReducer = combineReducers({
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
    global: globalReducer,
    userSetting: userSettingReducer,
    chat: chatReducer
  } as any)