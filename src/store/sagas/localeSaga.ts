
import { take, fork, select, put, call, cancelled, all, takeLatest } from 'redux-saga/effects'
import { eventChannel, Channel } from 'redux-saga'
import { initialize } from 'react-localize-redux'
import { addTranslationForLanguage } from 'react-localize-redux'
import { setActiveLanguage } from 'react-localize-redux'
import { LanguageType } from 'store/reducers/locale/langugeType'
import config from 'src/config'
import { GlobalActionType } from 'constants/globalActionType'
/***************************** Subroutines ************************************/

/**
 * Initialize localization
 */
function* initLocalization() {
    const languages = [
        { name: 'English', code: LanguageType.English },
        { name: 'French', code: LanguageType.French },
        { name: 'Spanish', code: LanguageType.Spanish }
        ]
    yield put(initialize(languages))
        // To set a different default active language set the `defaultLanguage` option.
    yield put(initialize(languages, { defaultLanguage: config.settings.defaultLanguage }))
    const englishLocale = require('locale/en.json')
    const spanishLocale = require('locale/es.json')
    yield put(addTranslationForLanguage(englishLocale, LanguageType.English))
    yield put(addTranslationForLanguage(spanishLocale, LanguageType.Spanish))
}

export default function* localeSaga() {
    yield all([
        takeLatest(GlobalActionType.INIT_LOCALE, initLocalization)
    ])
}
