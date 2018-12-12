import { SocialProviderTypes } from 'core/socialProviderTypes'
import { provider } from 'src/socialEngine'
import { take, fork, select, put, call, cancelled, all,takeEvery, takeLatest } from 'redux-saga/effects'
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { userSelector } from 'store/reducers/users/userSelector'
import { eventChannel, Channel } from 'redux-saga'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import {Map, fromJS} from 'immutable'
import { Notification } from 'src/core/domain/notifications'
import { INotificationService } from 'core/services'
import { UserClaim } from 'core/domain/authorize/userClaim'
import * as notificatioActions from 'store/actions/notifyActions'
import * as globalActions from 'store/actions/globalActions'
import { LoginUser } from 'core/domain/authorize/loginUser'
import { push } from 'connected-react-router'
import { NotificationActionType } from 'constants/notificationActionType'
import * as userActions from 'store/actions/userActions'
/**
 * Get service providers
 */
const notificationService: INotificationService = provider.get<INotificationService>(SocialProviderTypes.NotificationService)

/***************************** Subroutines ************************************/
/**
 * Creating channel event and subscribing notification service
 */
function subscribeNotification(userId: string) {  
    return eventChannel<{ [notifyId: string]: Notification}>((emmiter) => {
        const unsubscribe = notificationService.getNotifications(userId, (notifications: { [notifyId: string]: Notification} ) => {
            
             emmiter(notifications)
         })
         return () => {
             unsubscribe()
         }
     })
}

/**
 * On auth state change
 */
function* dbFetchNotification() {
    let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
    const uid = authedUser.get('uid')
     const channelSubscription: Channel<UserClaim> =  yield call(subscribeNotification, uid)

     try {    
         while (true) {
            let notifications: { [notifyId: string]: Notification} = yield take(channelSubscription)
            
            if (notifications) {
               const notificationKeys =  Object.keys(notifications)
            for (let notifyIndex = 0; notifyIndex < notificationKeys.length; notifyIndex++) {
                const notificationKey = notificationKeys[notifyIndex]
                const user = yield select(userSelector.getUserProfileById, {userId: uid})
                if (!user) {
                  yield put(userActions.dbGetUserInfoByUserId(notifications[notificationKey].notifierUserId,''))
                }
            }
                  yield put(notificatioActions.addNotifyList(fromJS(notifications)))
            }
        }
      } finally {
        if (yield cancelled()) {
            channelSubscription.close()
          } 
      }
    
}

export default function* notificationSga() {
    yield all([
      takeLatest(NotificationActionType.DB_FETCH_NOTIFICATIONS, dbFetchNotification)
    ])
  }
  