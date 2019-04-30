import { LanguageType } from 'store/reducers/locale/langugeType'
import { VerificationType } from 'core/domain/authorize/verificationType'

export const environment = {
  firebase: {
    apiKey: 'AIzaSyBrE1ESWPE4PvWnqNhW4d_P_wC6k9dNCHw',
    authDomain: 'red-gold.firebaseapp.com',
    databaseURL: 'https://red-gold.firebaseio.com',
    projectId: 'red-gold',
    storageBucket: 'red-gold.appspot.com',
    messagingSenderId: '659592156778'
  },
  algolia: {
    appId: 'TOS20M7VT1',
    apiKey: 'c283440030db1f9446e8b410f7352479'
  },
  data: {
    imageFolderPath: 'images',
    avatarFolderPath: 'avatar',
    coverFolderPath: 'cover',
    videoFolderPath: 'videos',
    thumbnailFolderPath: 'thumbnail',
    videoThumbnailPath: 'video_thumbnail',
    locale: 'https://raw.githubusercontent.com/red-gold/react-social-locales/master/src/social'
  },
  dataFormat: {
    postVersion: '1.0.0'
  },
  exteranlSocial: {
    instagramClientId: '04cd49f9331643aeae1ad6df6e2b83f0'
  },
  settings: {
    enabledOAuthLogin: true,
    appName: 'React Social',
    supportEmail: 'amir.gholzam@live.com',
    appIcon: require('assets/images/appIcon.png'),
    logo: require('assets/images/logo.png'),
    defaultLanguage: LanguageType.English,
    defaultVideoThumbnails: require('assets/images/defaultVideoThumbnails.png'),
    verificationType: VerificationType.Email,
    companyName: 'Red Gold',
    defaultProfileCover: require('assets/images/coversocial.png'),
    publicCover: require('assets/images/public-cover.jpg'),
    raisedLogo: require('assets/images/raised-logo.png'),
    loginCover: require('assets/images/login-cover.jpg'),
    signupCover: require('assets/images/signup-cover.jpg'),
    logoHead: require('assets/images/logo-head.png'),
    androidAppLink: 'https://github.com/Qolzam/react-mobile-social',
    iosAppLink: 'https://github.com/Qolzam/react-mobile-social',
    api: '/api/',
    maxVideoFileSize: 20,
    maxGalley: 10
  },
  header: {
    title: 'React Social',
    meta: [
      {name: 'description', content: 'The React Social Network is an open source project relying on React a powerful javascript library for building the user interface. In this project, I tried to show some features of react/react components as a social network. The structure of this project give the ability to developer to develop their project on their own idea and environment.' }
    ],

  }
}
