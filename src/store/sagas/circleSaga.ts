import { take, fork, select, put, call, cancelled, all, takeLatest } from 'redux-saga/effects'
import { Map, fromJS } from 'immutable'
import * as serverActions from 'store/actions/serverActions'
import { provider } from 'socialEngine'
import * as circleActions from 'store/actions/circleActions'
import * as globalActions from 'store/actions/globalActions'
import * as userActions from 'store/actions/userActions'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { CircleActionType } from 'constants/circleActionType'
import { postSelector } from 'store/reducers/posts'
import { authorizeSelector } from 'store/reducers/authorize'
import { Post } from 'core/domain/posts'
import { PostAPI } from 'api/PostAPI'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { ICircleService } from 'core/services/circles/ICircleService'
import { Circle } from 'core/domain/circles/circle'
import { IUserTieService } from 'core/services/circles/IUserTieService'
/**
 * Get service providers
 */
const circleService: ICircleService = provider.get<ICircleService>(SocialProviderTypes.CircleService)
const userTieService: IUserTieService = provider.get<IUserTieService>(SocialProviderTypes.UserTieService)

/***************************** Subroutines ************************************/

/**
 * Fetch circles
 */
function* dbFetchCircle(action: { type: CircleActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const circles: { [circleId: string]: Circle } = yield call(circleService.getCircles, uid)
      yield put(circleActions.addCircles(circles))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Fetch user ties
 */
function* dbFetchUserTies(action: { type: CircleActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const result = yield call(userTieService.getUserTies, uid)
      yield put(userActions.addPeopleInfo(result))
      yield put(circleActions.addUserTies(result))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Fetch user tieds
 */
function* dbFetchUserTieds(action: { type: CircleActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const result = yield call(userTieService.getUserTieSender, uid)
      yield put(userActions.addPeopleInfo(result))
      yield put(circleActions.addUserTieds(result))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

export default function* circleSaga() {
  yield all([
    takeLatest(CircleActionType.DB_FETCH_CIRCLES, dbFetchCircle),
    takeLatest(CircleActionType.DB_FETCH_USER_TIES, dbFetchUserTies),
    takeLatest(CircleActionType.DB_FETCH_USER_TIEDS, dbFetchUserTieds),
  ])
}
