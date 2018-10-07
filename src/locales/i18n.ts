import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import config from 'src/config'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
    preload: ['en', 'zh', 'vi'],
    backend: {
      loadPath: `locales/{{ns}}/enjson_{{lng}}.json`,
    },
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      wait: true
    }
  })

export default i18n