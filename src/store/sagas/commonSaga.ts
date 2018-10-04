import { take, fork, select, put, call, cancelled, all,takeEvery, takeLatest } from 'redux-saga/effects'
import * as globalActions from 'store/actions/globalActions'
import * as imageGalleryActions from 'store/actions/imageGalleryActions'
import * as userActions from 'store/actions/userActions'
import * as postActions from 'store/actions/postActions'
import * as commentActions from 'store/actions/commentActions'
import * as circleActions from 'store/actions/circleActions'
import * as voteActions from 'store/actions/voteActions'
import * as notifyActions from 'store/actions/notifyActions'
import * as userSettingActions from 'store/actions/userSettingActions'
import { GlobalActionType } from 'constants/globalActionType'
import { ICommonService, IPostService } from 'core/services'
import { provider } from 'socialEngine'
import { SocialProviderTypes } from 'core/socialProviderTypes'

/**
 * Get service providers
 */
const commonService: ICommonService = provider.get<ICommonService>(SocialProviderTypes.CommonService)
/***************************** Subroutines ************************************/

/**
 * Clear loaded data
 */
function* clearLoadedData() {
   yield put(imageGalleryActions.clearAllData())
   yield put(postActions.clearAllData())
   yield put(userActions.clearAllData())
   yield put(commentActions.clearAllData())
   yield put(voteActions.clearAllvotes())
   yield put(notifyActions.clearAllNotifications())
   yield put(circleActions.clearAllCircles())
   yield put(globalActions.clearTemp())
}

/**
 * Clear loaded data
 */
function* loadInitialData() {
  yield put(imageGalleryActions.dbGetImageGallery())
  yield put(userActions.dbGetUserInfo())
  yield put(notifyActions.dbGetNotifications())
  yield put(circleActions.dbGetCircles())
  yield put(circleActions.dbGetUserTies())
  yield put(circleActions.dbGetFollowers())
  yield put(userSettingActions.dbFetchUserSetting())
}

/**
 * Get twitter media
 */
function* loadTwitterMedia(action: { type: GlobalActionType, payload: any }) {
  const {payload} = action
  const {accessToken} = payload
  try {
     const result =  yield call(commonService.getTwitterMedia, accessToken)
     yield put(postActions.addInstagramPosts(result))
  } catch (error) {
    yield put(globalActions.showMessage(error.message))
  }

}

export default function* commonSaga() {
    yield all([
      takeLatest(GlobalActionType.CLEAR_LOADED_DATA, clearLoadedData),
      takeLatest(GlobalActionType.LOAD_INITIAL_DATA, loadInitialData),
      takeLatest(GlobalActionType.LOAD_TWITTER_MEDIA, loadTwitterMedia)
      
    ])
  }
  