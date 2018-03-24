import { all, fork } from 'redux-saga/effects'
import commentSaga from 'sagas/commentSaga'

export default function* root() {
    yield all([
      commentSaga()
    ])
  }
  