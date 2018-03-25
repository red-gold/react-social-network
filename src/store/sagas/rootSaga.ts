import { all, fork } from 'redux-saga/effects'
import commentSaga from './commentSaga'

export default function* root() {
    yield all([
      commentSaga()
    ])
  }
  