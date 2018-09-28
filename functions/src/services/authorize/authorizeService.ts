import * as functions from 'firebase-functions'
import { adminDB, firestoreDB, validateFirebaseIdToken } from '../../data/index'
import { Comment } from '../../domain/comments/comment'
import * as _ from 'lodash'
import { Circle } from '../../domain/circles/circle'
import * as moment from 'moment'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { SocialError } from '../../domain/common/index'
import { Verification } from '../../domain/authorize/verification'
import { UserStateType } from '../../domain/authorize/userStateType'
import { HttpStatusCode } from '../../data/httpStatusCode'
import { UserPermissionType } from '../../domain/common/userPermissionType'

const plivo = require('plivo')
const request = require('request')
const cookieParser = require('cookie-parser')()
const bcrypt = require('bcrypt')
const saltRounds = 10

const appName = functions.config().setting.appname

/**
 * Handle on user create
 */
export const onUserCreate = functions.auth.user().onCreate((user) => {
    return new Promise<void>((resolve, reject) => {
        const followingCircle = new Circle()
        followingCircle.creationDate = moment().unix()
        followingCircle.name = `Following`
        followingCircle.ownerId = user.uid
        followingCircle.isSystem = true
        return firestoreDB.collection(`users`).doc(user.uid).collection(`circles`).add({ ...followingCircle })
            .then((result) => {
                resolve()
            }).catch(reject)

    })
})

const app = express()
const cors = require('cors')({ origin: true })
app.disable('x-powered-by')
app.use(cors)
app.use(bodyParser.json())
app.use(cookieParser)
app.use(validateFirebaseIdToken)

app.post('/api/sms-verification', async (req, res) => {
    const remoteIpAddress = req.connection.remoteAddress
    const gReCaptcha = req.body['g-recaptcha-response']
    const code = Math.floor(1000 + Math.random() * 9000)
    const sourcePhoneNumber = '+9891132357'
    const targetPhoneNumber = req.body['phoneNumber']
    const phoneMessage = ` ${appName} : <CODE>`
    const secretKey = functions.config().recaptcha.secretkey
    const userId = (req as any).user.uid

    if (gReCaptcha === undefined || gReCaptcha === '' || gReCaptcha === null) {
        return res.json(new SocialError('ServerError/NullCaptchaValue', 'Please select captcha first'))
    }
    const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + gReCaptcha + '&remoteip=' + remoteIpAddress

    request(verificationURL, (error: any, response: any, body: any) => {
        body = JSON.parse(body)
        if (body.success !== undefined && !body.success) {
            console.log('Captha/responseError', error)
            console.log('Captha/responseError', response)
            console.log('Captha/responseError', body)
            res.status(HttpStatusCode.BadRequest).json(new SocialError('ServerError/ResponseCaptchaError', 'Failed captcha verification'))
        }
        console.log('Captha/responseSuccess')
        const client = new plivo.Client(functions.config().plivo.authid, functions.config().plivo.authtoken)
        client.messages.create(sourcePhoneNumber, targetPhoneNumber, phoneMessage.replace('<CODE>', String(code)))
            .then(function (messageCreated: any) {
                const verifyRef = firestoreDB.collection('verification').doc(userId).collection('phone')
                    .doc()
                const phoneVerification = new Verification(
                    verifyRef.id,
                    String(code),
                    targetPhoneNumber,
                    moment().unix(),
                    remoteIpAddress,
                    userId
                )
                verifyRef.set({ ...phoneVerification }).then(() => {
                    res.status(HttpStatusCode.OK).json({ 'verifyId': verifyRef.id })
                }).catch((error) => {
                    console.log(`/api/sms-verification\n collection(verification) \n UserID: ${userId} :: phone`, error)
                    res.status(HttpStatusCode.InternalServerError).json(new SocialError('api/sms-verification', 'Server can not set verification!'))
                })
            })
    })
})

/**
 * Verify phone code
 */
app.post('/api/verify-phone', async (req, res) => {
    const remoteIpAddress = req.connection.remoteAddress
    const code = req.body['code']
    const verifyId = req.body['verifyId']
    const targetPhoneNumber = req.body['phoneNumber']
    const userId = (req as any).user.uid

    const verifyRef = firestoreDB
        .collection('verification')
        .doc(userId)
        .collection('phone')
        .doc(verifyId)

    try {

        const result = await verifyRef.get()
        const phoneVerification = result.data() as Verification
        console.log('phoneVerification : ', phoneVerification)
        if (
            !phoneVerification.isVerified
            && remoteIpAddress === phoneVerification.remoteIpAddress
            && targetPhoneNumber === phoneVerification.target
            && userId === phoneVerification.userId) {
            if (Number(phoneVerification.code) === Number(code)) {
                const batch = firestoreDB.batch()
                batch.update(result.ref, { isVerified: true })

                const protectedUserRef = firestoreDB
                    .collection('protectedUser')
                    .doc(userId)
                batch.update(protectedUserRef, { phoneVerified: true })
                const batch$ = batch.commit()
                console.log('ServerSuccess/CodeAccepted', 'CodeAccepted')
                const additionalClaims = {
                    phoneVerified: true
                }
               const userInfo$ = firestoreDB.collection('userInfo').doc(userId).update({state: UserStateType.Active})
               const customToken$ =  adminDB.auth().createCustomToken(userId, additionalClaims)
               try {
                   const resultCreateToken = await Promise.all([customToken$, userInfo$ ,batch$])
                   return res.status(HttpStatusCode.OK).json({ token: resultCreateToken[0] })
                   
               } catch (error) {
                   console.log('ServerError/CanUpdateState', error)
                  return res.json(new SocialError('ServerError/CanUpdateState', 'Can not update user state!'))
                   
               }
                // Send token back to client

            } else {
                res.status(HttpStatusCode.Forbidden).json(new SocialError('ServerError/WrongCode', 'The code is not correct!'))
            }
        } else {
            res.status(HttpStatusCode.Forbidden).send(new SocialError('ServerError/Unauthorized', 'User is Unauthorized!'))
        }

    } catch (error) {
        console.log('ServerError/VerifyIdNotAccept', error)
        return res.json(new SocialError('ServerError/VerifyIdNotAccept', "We couldn't for you verification!"))
    }
})

/**
 * Register user
 */
app.post('/api/register', async (req, res) => {
    const remoteIpAddress = req.connection.remoteAddress
    const userName = req.body['userName']
    const password = req.body['password']
    const email = req.body['email']
    const fullName = req.body['fullName']
    const avatar = req.body['avatar']
    const userId = (req as any).user.uid

    firestoreDB.doc(`userInfo/${userId}`).set(
        {
            id: userId,
            userId: userId,
            state: 'active',
            avatar,
            fullName,
            creationDate: moment().unix(),
            email,
            accessUserList: [],
            permission: UserPermissionType.Public
        }
    ).then(() => {
        bcrypt.hash(password, saltRounds, function (error: any, hash: any) {
            // Store hash in your password DB.
            firestoreDB.collection('protectedUser').doc(userId)
                .set({
                    userName: userName,
                    password: hash,
                    phoneVerified: false
                }).then(() => {
                    return res.status(HttpStatusCode.OK).json({})
                }).catch((error: any) => {
                    res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/NotStoreProtectedUser', 'Can not store protected user!'))
                })
        })
    }).catch((error: any) => {
        res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/NotStoreUserInfo', 'Can not store user info!'))
    })
})

/**
 * Register user
 */
app.post('/api/update-password', async (req, res) => {
    const remoteIpAddress = req.connection.remoteAddress
    const newPassword = req.body['newPassword'] as string
    const confirmPassword = req.body['confirmPassword'] as string
    const userId = (req as any).user.uid as string
    console.log('userID: ', userId)
    if ((newPassword && confirmPassword)
        && (newPassword.trim() !== '' && confirmPassword.trim() !== '')
        && (confirmPassword === newPassword)) {

        adminDB.auth().updateUser(userId, {
            password: newPassword
        }).then((updateResult) => {
            bcrypt.hash(newPassword, saltRounds, function (error: any, hash: any) {
                // Store hash in your password DB.
                firestoreDB.collection('protectedUser').doc(userId)
                    .update({
                        password: hash,
                    }).then(() => {
                        return res.status(HttpStatusCode.OK).json({})
                    }).catch((error: any) => {
                        console.log('ServerError/NotStoreProtectedUser', error)
                        res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/NotStoreProtectedUser', 'Can not store protected user!'))
                    })
            })
        })
            .catch((error) => {
                console.log('UpdateUser/Password', error)
                res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/ErrorUpdateUser', 'Can not update user!'))
            })

    } else {
        res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/NotEqualConfirmNewPassword', 'Confirm password and new password are not equal!'))
    }

})

/**
 * Phone verification
 */
export const auth = functions.https.onRequest(app)