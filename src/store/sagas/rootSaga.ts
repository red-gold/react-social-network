import { all, fork } from 'redux-saga/effects'
import commentSaga from './commentSaga'
import localeSaga from './localeSaga'
import userSaga from './userSaga'
import authorizeSaga from './authorizeSaga'
import commonSaga from './commonSaga'
import postSaga from './postSaga'
import gallerySaga from './gallerySaga'
import notificationSaga from './notificationSaga'
import circleSaga from './circleSaga'
import userSettingSaga from './userSettingSaga'
import chatSaga from './chatSaga'

export default function* root() {
    yield all([
      authorizeSaga(),
      localeSaga(),
      commentSaga(),
      userSaga(),
      commonSaga(),
      postSaga(),
      userSettingSaga(),
      gallerySaga(),
      notificationSaga(),
      circleSaga(),
      chatSaga()
    ])
  }
  