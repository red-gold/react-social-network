import { termsDocES } from './privacy/termsDoc.es'
import { cookiePolicyDocES } from './privacy/cookiePolicyDoc.es'
import { privacyDocES } from './privacy/privacyDoc.es'
import { cookiePolicyDocEN } from './privacy/cookiePolicyDoc.en'
import { termsDocEN } from './privacy/termsDoc.en'
import { privacyDocEN } from './privacy/privacyDoc.en'

const getTerm = (currentLanguage: string) => {
    if (!currentLanguage || currentLanguage === '') {
        return
    }
    const termsList = {
        'es': termsDocES,
        'en': termsDocEN,
    }
    return termsList[currentLanguage]
}

const getCookiePolicy = (currentLanguage: string) => {
    if (!currentLanguage || currentLanguage === '') {
        return
    }
    const cookiePolicyList = {
        'es': cookiePolicyDocES,
        'en': cookiePolicyDocEN
    }
    return cookiePolicyList[currentLanguage]
}

const getPrivacyPolicy = (currentLanguage: string) => {
    if (!currentLanguage || currentLanguage === '') {
        return
    }
    const privacyPolicyList = {
        'es': privacyDocES,
        'en': privacyDocEN
    }
    return privacyPolicyList[currentLanguage]
}

export const localeDocs = {
    getTerm,
    getCookiePolicy,
    getPrivacyPolicy
}