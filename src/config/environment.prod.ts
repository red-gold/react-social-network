import { LanguageType } from 'reducers/locale/langugeType'

export const environment = {
  firebase: {
    apiKey: 'AIzaSyAHOZ7rWGDODCwJMB3WIt63CAIa90qI-jg',
    authDomain: 'test-4515a.firebaseapp.com',
    databaseURL: 'https://test-4515a.firebaseio.com',
    projectId: 'test-4515a',
    storageBucket: 'test-4515a.appspot.com',
    messagingSenderId: '964743099489'
  },
  settings: {
    appName: 'Green',
    defaultLanguage: LanguageType.English
  },
  theme: {
    primaryColor: '#00b1b3',
    secondaryColor: '#4d545d'
  }
}
