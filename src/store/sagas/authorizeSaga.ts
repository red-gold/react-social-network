import { SocialProviderTypes } from 'core/socialProviderTypes'
import { provider } from 'src/socialEngine'
import { take, fork, select, put, call, cancelled, all,takeEvery, takeLatest } from 'redux-saga/effects'
import { eventChannel, Channel } from 'redux-saga'
import { IAuthorizeService } from 'core/services'
import { UserClaim } from 'core/domain/authorize/userClaim'
import { AuthorizeActionType } from 'constants/authorizeActionType'
import * as authorizeActions from 'store/actions/authorizeActions'
import * as globalActions from 'store/actions/globalActions'
import * as serverActions from 'store/actions/serverActions'
import { LoginUser } from 'core/domain/authorize/loginUser'
import { AuthAPI } from 'src/api/AuthAPI'
import { ServerRequestStatusType } from '../actions/serverRequestStatusType';
import { SignupStepEnum } from 'src/models/authorize/signupStepEnum';
import { authorizeSelector } from '../reducers/authorize';

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
 * Fetch user register token
 */
function* fetchUserRegisterToken(action: any) {
    const {user, captchaVerifier} = action.payload
    let signupRequest =  AuthAPI.createSignupRequest(user.email)
    yield put(serverActions.sendRequest(signupRequest))
    try {
        const token = yield call(authorizeService.getUserRegisterToken, user, captchaVerifier)
        signupRequest.status = ServerRequestStatusType.OK
        yield put(serverActions.sendRequest(signupRequest))

        yield put(authorizeActions.setUserRegisterToken(token))
        yield put(authorizeActions.setSignupStep(SignupStepEnum.VerifyCode))
        
    } catch (error) {
        signupRequest.status = ServerRequestStatusType.Error
        yield put(serverActions.sendRequest(signupRequest))
        yield put(globalActions.showMessage(error.message))
    }
}

/**
 * Verify user register code
 */
function* verifyUserRegisterCode(action: any) {
    const {code} = action.payload
    let signupRequest =  AuthAPI.createSignupRequest(code)
    yield put(serverActions.sendRequest(signupRequest))
    try {
        const registerToken = yield select(authorizeSelector.getUserRegisterToken)
        const response = yield call(authorizeService.verifyUserRegisterCode, code, registerToken)
        console.trace('ressponse/verifyUserRegisterCode', response)
        signupRequest.status = ServerRequestStatusType.OK
        yield put(serverActions.sendRequest(signupRequest))
        yield call(authorizeService.loginByToken, response.token)

    } catch (error) {
        signupRequest.status = ServerRequestStatusType.Error
        yield put(serverActions.sendRequest(signupRequest))
        yield put(globalActions.showMessage(error.message))
    }
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
                    const userClaim: UserClaim =  yield call(authorizeService.getUserClaim as any, currentUser )
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
      takeLatest(AuthorizeActionType.ASYNC_FETCH_USER_REGISTER_TOKEN, fetchUserRegisterToken),
      takeLatest(AuthorizeActionType.ASYNC_VERITY_USER_REGISTER_CODE, verifyUserRegisterCode),
    ])
  }
  