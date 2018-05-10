import { initialize } from 'react-localize-redux'
import { addTranslationForLanguage } from 'react-localize-redux'
import { setActiveLanguage } from 'react-localize-redux'
import { LanguageType } from 'store/reducers/locale/langugeType'
import config from 'src/config'

/**
 *  Set active language for translation
 */
export const setLanguage = (language: LanguageType) => {
  return (dispatch: Function , getState: Function) => {
    
    // Dispatch `setActiveLanguage` and pass the language.
    dispatch(setActiveLanguage(language))
  }
}