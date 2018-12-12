import { SocialProviderTypes } from 'core/socialProviderTypes'
import { provider } from 'src/socialEngine'
import { take, fork, select, put, call, cancelled, all,takeEvery, takeLatest } from 'redux-saga/effects'
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { eventChannel, Channel } from 'redux-saga'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import {Map} from 'immutable'
import { IAuthorizeService } from 'core/services'
import { UserClaim } from 'core/domain/authorize/userClaim'
import { AuthorizeActionType } from 'constants/authorizeActionType'
import * as authorizeActions from 'store/actions/authorizeActions'
import * as globalActions from 'store/actions/globalActions'
import { LoginUser } from 'core/domain/authorize/loginUser'
import { push } from 'connected-react-router'
/**
 * Get service providers
 */
const authorizeService: IAuthorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService)

/***************************** Subroutines ************************************/
/**
 * Creating channel event and subscribing user auth change service
 */
function subscribeAuthStateChanged() {  
    return eventChannel<UserClaim>((emmiter) => {
        const unsubscribe = authorizeService.onAuthStateChanged((userClaim: UserClaim) => { 
            
             emmiter(userClaim || {noUser: true})
         })
         return () => {
             unsubscribe()
         }
     })
}

/**
 * On login user
 */
function* onLoginUser(userClaim: UserClaim) {
    yield put(authorizeActions.login(new LoginUser(
        userClaim.uid,
        userClaim.emailVerified,
        userClaim.providerId,
        userClaim.displayName,
        userClaim.email,
        userClaim.photoURL,
        userClaim.phoneVerified
    )))
}

/**
 * On logout user
 */
function* onLogoutUser() {
    yield put(authorizeActions.logout())
    yield put(globalActions.clearLoadedData())
}

/**
 * Get user register token
 */
function* getUserRegisterToken(action: any) {
    const {user} = action.payload

    const token = yield call(authorizeService.getUserRegisterToken, user)
    debugger
    yield put(authorizeActions.setUserRegisterToken(token))
}

/**
 * On auth state change
 */
function* onAuthStateChanged() {
     const channelSubscription: Channel<UserClaim> =  yield call(subscribeAuthStateChanged)

     try {    
         while (true) {
            let currentUser: any = yield take(channelSubscription)
            if (currentUser && !currentUser.noUser) {
                const tokenId: string =  yield currentUser.getIdToken()
                    const userClaim: UserClaim =  yield call(authorizeService.getUserClaim, currentUser )
                    yield call(onLoginUser, userClaim)
                    yield put(globalActions.defaultDataEnable())
            
            } else {
                yield call(onLogoutUser)
                yield put(globalActions.defaultDataEnable())
            }
        }
      } finally {
        if (yield cancelled()) {
            channelSubscription.close()
          } 
      }
    
}

export default function* authorizeSaga() {
    yield all([
      takeLatest(AuthorizeActionType.SUBSCRIBE_AUTH_STATE_CHANGE, onAuthStateChanged),
      takeLatest(AuthorizeActionType.FETCH_USER_REGISTER_TOKEN, getUserRegisterToken)
    ])
  }
  