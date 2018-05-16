import { all, fork } from 'redux-saga/effects'
import commentSaga from './commentSaga'
import localeSaga from './localeSaga'

export default function* root() {
    yield all([
      localeSaga(),
      commentSaga(),
    ])
  }
  