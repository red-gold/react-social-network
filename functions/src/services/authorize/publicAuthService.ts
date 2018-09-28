import * as functions from 'firebase-functions'
import { adminDB, firestoreDB } from '../../data/index'
import * as _ from 'lodash'
import * as moment from 'moment'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { SocialError } from '../../domain/common/index'
import { Verification } from '../../domain/authorize/verification'
import { UserStateType } from '../../domain/authorize/userStateType'
import { emailAPI } from '../../api/emailAPI'
import { Email } from '../../domain/common/email'
import { Profile } from '../../domain/users/index'
import { HttpStatusCode } from '../../data/httpStatusCode'
const bcrypt = require('bcrypt')
const request = require('request')

const cookieParser = require('cookie-parser')()

const app = express()
const cors = require('cors')({ origin: true })
app.disable('x-powered-by')
app.use(cors)
app.use(bodyParser.json())
app.use(cookieParser)

const gmailEmail = functions.config().gmail.email
const appName = functions.config().setting.appname

/**
 * Login user API
 */
app.post('/api/login', async (req, res) => {
    const remoteIpAddress = req.connection.remoteAddress
    const userName = req.body['userName']
    const password = req.body['password']
    console.log(userName, password)
    firestoreDB.collection('protectedUser').where('userName', '==', userName)
        .get().then((result) => {
            console.log('result', result.size, result.empty)
            if (result && !result.empty && result.size === 1) {
                const doc = result.docs[0]
                console.log(doc)
                const data = doc.data()
                console.log('data = ', data)
                bcrypt.compare(password, data.password, (error: any, isSame: any) => {
                    if (isSame === true) {
                        const additionalClaims = {
                            phoneVerified: data.phoneVerified,
                            userName: data.userName
                        }
                        adminDB.auth().createCustomToken(doc.id, additionalClaims)
                            .then((token) => {
                                // Send token back to client
                                return res.status(HttpStatusCode.OK).json({ token })
                            })
                            .catch((error) => {
                                console.log('Error creating custom token:', error)
                                return res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/CreateToke', 'Error on creating token!'))
                            })
                    } else {
                        return res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/WrongPassword', 'Password is wrong!'))
                    }
                })

            } else {
                return res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/WrongUserName', 'User name is wrong!'))
            }
        })
        .catch((error) => {
            return res.status(HttpStatusCode.InternalServerError).send(new SocialError('ServerError/FirestoreGetData', error))
        })
})

/**
 * Verify phone code
 */
app.post('/api/verify-email', async (req, res) => {
    const remoteIpAddress = req.connection.remoteAddress
    const code = req.body['code']
    const verifyId = req.body['verifyId']
    const targetEmail = req.body['email']
    firestoreDB.collection('userInfo').where('email', '==', targetEmail)
        .get().then((userInfo) => {
                console.log('userInfo', userInfo.size, userInfo.empty)
                if (userInfo && !userInfo.empty && userInfo.size === 1) {
                    const doc = userInfo.docs[0]
                    const userId = doc.id
                    console.log(doc)
                    const data = doc.data() as Profile
                    console.log('data = ', data)
                const verifyRef = firestoreDB
                    .collection('verification')
                    .doc(userId)
                    .collection('resetPassword')
                    .doc(verifyId)

                return verifyRef.get().then((result) => {
                    
                    const verification = result.data() as Verification
                    console.log(verification, req.body,
                        !verification.isVerified,
                        remoteIpAddress === verification.remoteIpAddress,
                        targetEmail === verification.target,
                        userId === verification.userId
                    )
                    if (
                        !verification.isVerified
                        && remoteIpAddress === verification.remoteIpAddress
                        && targetEmail === verification.target
                        && userId === verification.userId) {
                        if (Number(verification.code) === Number(code)) {
                            firestoreDB.collection('protectedUser').doc(userId)
                            .get().then((protectedUserResult) => {
                                let phoneVerified = false
                                if (protectedUserResult.exists && protectedUserResult.data().phoneVerified) {
                                    phoneVerified = true
                                }
                                console.log('ServerSuccess/CodeAccepted', 'CodeAccepted', phoneVerified)
                                const additionalClaims = {
                                    phoneVerified: phoneVerified,
                                    userName: data.email,
                                    resetPasswordVerified: true
                                }
                                adminDB.auth().createCustomToken(userId, additionalClaims)
                                    .then( (token) => {
                                        // Send token back to client
                                        return res.status(HttpStatusCode.OK).json({ token })
                                    })
                                    .catch((error) => {
                                        console.log('Error creating custom token:', error)
                                        res.status(HttpStatusCode.InternalServerError).json(new SocialError('ServerError/CreateCustomToken', 'Create custom token error!'))
                                    })
                                })
                           
                        } else {
                            res.status(HttpStatusCode.Forbidden).json(new SocialError('ServerError/WrongCode', 'The code is not correct!'))
                        }
                    } else {
                        res.status(HttpStatusCode.Forbidden).send(new SocialError('ServerError/Unauthorized', 'User is Unauthorized!'))
                    }
                })
                    .catch((error) => {
                        console.log('ServerError/VerifyIdNotAccept', error)
                        return res.json(new SocialError('ServerError/VerifyIdNotAccept', "We coudn't for you verification!"))
                    })
            } else {
                res.status(HttpStatusCode.NotFound).send(new SocialError('ServerError/EmailNotFound', 'Email not found!'))
            }
        })
        .catch((error) => {
            res.status(HttpStatusCode.NotFound).send(new SocialError('ServerError/EmailNotFound', 'Email not found!'))
        })

})

/**
 * Reset password API
 */
app.post('/api/email-verification-code', async (req, res) => {
    const remoteIpAddress = req.connection.remoteAddress
    const gReCaptcha = req.body['g-recaptcha-response']
    const code = Math.floor(1000 + Math.random() * 9000)
    const targetEmail = req.body['email']
    const secretKey = functions.config().recaptcha.secretkey
    const from = `${appName} Reset Password <${gmailEmail}>`
    const to = targetEmail
    const subject = `Reset your password for ${appName}`
    firestoreDB.collection('userInfo').where('email', '==', targetEmail)
        .get().then((userInfoList) => {

            if (userInfoList.size === 1) {
                const user = userInfoList.docs[0].data() as Profile
                const userId = userInfoList.docs[0].id
                const html = `
                <html xmlns="http://www.w3.org/1999/xhtml">

                <body>
                <div>
                    <h4>Hello ${user.fullName},</h4>

                    <p>Verification code from ${appName} for ${targetEmail}.</p>

                    <h3>Code Verification: ${code}</h3>

                    <p>If you did not request to reset your password, you can ignore this email.</p>

                    <h4>Thanks,</h4>

                    <h4>${appName} Team</h4>
                </div>
                </body>
                </html>
                        `

                if (gReCaptcha === undefined || gReCaptcha === '' || gReCaptcha === null) {
                    return res.json(new SocialError('ServerError/NullCaptchaValue', 'Please select captcha first'))
                }
                const verificationURL = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + gReCaptcha + '&remoteip=' + remoteIpAddress

                request(verificationURL, (error: any, response: any, body: any) => {
                    body = JSON.parse(body)
                    if (body.success !== undefined && !body.success) {
                        console.log('Captha/responseError', error)
                        return res.json(new SocialError('ServerError/ResponseCaptchaError', 'Failed captcha verification'))
                    }
                    console.log('Captha/responseSuccess')
                    emailAPI.sendEmail(new Email(
                        from,
                        to,
                        subject,
                        html
                    )).then(function (messageCreated: any) {
                        const verifyRef = firestoreDB.collection('verification').doc(userId).collection('resetPassword')
                            .doc()
                        const resetPasswordVerification = new Verification(
                            verifyRef.id,
                            String(code),
                            targetEmail,
                            moment().unix(),
                            remoteIpAddress,
                            userId
                        )
                        verifyRef.set({ ...resetPasswordVerification })
                        return res.status(HttpStatusCode.OK).json({ 'verifyId': verifyRef.id })
                    }).catch((error) => {
                        res.status(HttpStatusCode.ServiceUnavailable).send(new SocialError('ServerError/EmailNotSent', 'Email service error. Email has not sent!'))
                    })

                })
            } else {
                res.status(HttpStatusCode.NotFound).send(new SocialError('ServerError/EmailNotFound', 'Email not found!'))
            }
        })
        .catch((error) => {
            res.status(HttpStatusCode.NotFound).send(new SocialError('ServerError/EmailNotFound', 'With DB error. Email not found!'))
        })

})

/**
 * Phone verification
 */
export const publicAuth = functions.https.onRequest(app)