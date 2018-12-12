
import { take, fork, select, put, call, cancelled, all, takeLatest } from 'redux-saga/effects'
import { eventChannel, Channel } from 'redux-saga'
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

        return languages
}

export default function* localeSaga() {
    yield all([
        takeLatest(GlobalActionType.INIT_LOCALE, initLocalization)
    ])
}
