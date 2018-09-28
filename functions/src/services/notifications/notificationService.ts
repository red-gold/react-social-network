
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB } from '../../data/index'
import { emailAPI } from '../../api/emailAPI'
import { Email } from '../../domain/common/email'
import { Notification } from '../../domain/notifications'
import { NotificationType } from '../../domain/notifications/notificationType'
import { Profile } from '../../domain/users'
import { UserSettingType } from '../../domain/users/userSettingType'

const gmailEmail = functions.config().gmail.email
const appName = functions.config().setting.appname

/**
 * Handle on add notification
 */
export const onCreateNotification = functions.firestore.document('users/{userId}/notifications/{notificationId}')
  .onCreate(async (dataSnapshot, event) => {
    const notification = dataSnapshot.data() as Notification
    const notifiedUserId = event.params.userId
    const userSettingDoc = await firestoreDB.collection('userSetting').doc(notifiedUserId).get()
    const userSettingData = userSettingDoc.data()
    if (!userSettingDoc.exists  || !userSettingData) {
        return true
    }
    console.log('userSettingData', userSettingData)
    const onVoteEmail = notification.type === NotificationType.OnVote && userSettingData[UserSettingType.Notification_EmailOnVoteEnable]
    const onCommentEmail = notification.type === NotificationType.OnComment && userSettingData[UserSettingType.Notification_EmailOnCommentEnable]
    const onFollowEmail = notification.type === NotificationType.OnFollow && userSettingData[UserSettingType.Notification_EmailOnFollowEnable]
    if (!(onVoteEmail || onCommentEmail || onFollowEmail)) {
      return true
    }

    const title: { [key: string]: string } = {
      [NotificationType.OnComment]: `${notification.notifierProfile.fullName || notification.notifierProfile.email} commented on your post.`,
      [NotificationType.OnVote]: `${notification.notifierProfile.fullName || notification.notifierProfile.email} liked your post.`,
      [NotificationType.OnFollow]: `${notification.notifierProfile.fullName || notification.notifierProfile.email} followed you.`
    }

    const notifyRecieverUserData = await firestoreDB
      .collection('userInfo')
      .doc(notification.notifyRecieverUserId)
      .get()
    const notifyRecieverUser = notifyRecieverUserData.data() as Profile
    const from = `${appName} Notification <${gmailEmail}>`
    const to = notifyRecieverUser.email
    const subject = `${appName} Notification -${title[notification.type]}`
    const text = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>
  <head>
    <style>
      button:hover{opacity:0.7}
      a:hover{opacity:0.7}
    </style>
    
  </head>
  <body>
    <div class="card" style="box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2);max-width:300px;margin:auto;text-align:center;font-family:arial;">
      <img src="${notification.notifierProfile.avatar}" alt="${notification.notifierProfile.fullName || notification.notifierProfile.email}" style="width:100%">
      <h1>${notification.notifierProfile.fullName || notification.notifierProfile.email}</h1>
      <p class="title" style="color:grey;font-size:18px;">${title[notification.type]}</p>
      <p></p>
      <div style="margin: 24px 0;">
      </div>
      <p><a href="https://localhost:3000${notification.url}" style="border:none;outline:0;display:inline-block;padding:8px;color:white;background-color:#000;text-align:center;cursor:pointer;width:100%;font-size:18px;">Click HERE!</a></p>
    </div>
  </body>
</html>
              `
    /**
     * Send email
     */
    const emailResult = await emailAPI.sendEmail(new Email(
      from,
      to,
      subject,
      text
    ))
    return emailResult
  })
