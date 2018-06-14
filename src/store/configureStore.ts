import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'

const store = process.env.NODE_ENV === 'production'
? configureStoreProd
: configureStoreDev

export default store