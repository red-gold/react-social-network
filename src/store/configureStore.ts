import configureStoreDev from './dev.configureStore'
import configureStoreProd from './prod.configureStore'
import configureStoreTest from './test.configureStore'

const store = process.env.NODE_ENV === 'production'
? configureStoreProd
: (process.env.NODE_ENV === 'test' ? configureStoreTest : configureStoreDev)

export default store