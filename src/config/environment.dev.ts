import { LanguageType } from 'store/reducers/locale/langugeType'

export const environment = {
  firebase: {
      apiKey: 'AIzaSyDzFdZteXViq65uzFp4sAmesXk43uW_VfU',
      authDomain: 'react-social-86ea9.firebaseapp.com',
      databaseURL: 'https://react-social-86ea9.firebaseio.com',
      projectId: 'react-social-86ea9',
      storageBucket: 'react-social-86ea9.appspot.com',
      messagingSenderId: '760013286552',
      appId: '1:760013286552:web:4c9d52d1a2e0b824'
  },
  settings: {
    enabledOAuthLogin: false,
    appName: 'Green',
    defaultProfileCover: 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
    defaultLanguage: LanguageType.English
  },
  theme: {
    primaryColor: '#00b1b3',
    secondaryColor: '#4d545d'
  }
}
