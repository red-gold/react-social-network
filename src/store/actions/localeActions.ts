import { initialize } from 'react-localize-redux'
import { addTranslationForLanguage } from 'react-localize-redux'
import { setActiveLanguage } from 'react-localize-redux'
import { LanguageType } from 'store/reducers/locale/langugeType'
import config from 'src/config'

/**
 *  Initialize translation
 */
export const initTranslation = () => {
  return (dispatch: Function , getState: Function) => {
    // - Intialize language 
    const languages = [
      { name: 'English', code: LanguageType.English },
      { name: 'French', code: LanguageType.French },
      { name: 'Spanish', code: LanguageType.Spanish }
      ]
    dispatch(initialize(languages))
    
    // To set a different default active language set the `defaultLanguage` option.
    dispatch(initialize(languages, { defaultLanguage: config.settings.defaultLanguage }))
    const englishLocale = require('locale/en.json')
    const spanishLocale = require('locale/es.json')
    dispatch(addTranslationForLanguage(englishLocale, LanguageType.English))
    dispatch(addTranslationForLanguage(spanishLocale, LanguageType.Spanish))

  }
}

/**
 *  Set active language for translation
 */
export const setLanguage = (language: LanguageType) => {
  return (dispatch: Function , getState: Function) => {
    
    // Dispatch `setActiveLanguage` and pass the language.
    dispatch(setActiveLanguage(language))
  }
}