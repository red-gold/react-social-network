import configureStoreDev from './configureStore.dev'
import configureStoreProd from './configureStore.prod'

const store = process.env.NODE_ENV === 'production'
? configureStoreDev
: configureStoreProd

export default store