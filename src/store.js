import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { nprogressMiddleware } from 'redux-nprogress'
import { persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage/session'
import { nprogress } from 'redux-nprogress'
import { isProd } from './utils'
import authReducer from './reducer/auth'
import migrations  from './migrations'

const persistConfig = {
    transforms: [immutableTransform()],
    key: 'liv5',
    version: 1,
    migrate: migrations,
    storage,
    whitelist: ['auth'],
}

const reducer = combineReducers({
    auth: authReducer,
    nprogress,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, nprogressMiddleware())),
)
