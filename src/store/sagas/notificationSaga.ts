import { NotificationActionType } from 'constants/notificationActionType';
import { UserClaim } from 'core/domain/authorize/userClaim';
import { INotificationService } from 'core/services';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { fromJS, Map } from 'immutable';
import { Channel, eventChannel } from 'redux-saga';
import { all, call, cancelled, put, select, take, takeLatest } from 'redux-saga/effects';
import { Notification } from 'src/core/domain/notifications';
import { provider } from 'src/socialEngine';
import * as notificatioActions from 'store/actions/notifyActions';
import * as userActions from 'store/actions/userActions';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';
import { userSelector } from 'store/reducers/users/userSelector';

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
  