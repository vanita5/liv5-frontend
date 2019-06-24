import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistStore } from 'redux-persist'
import { BrowserRouter as Router } from 'react-router-dom'
import { NProgress } from 'redux-nprogress'
import store from './store'
import * as serviceWorker from './serviceWorker'

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<p>Loading...</p>}>
            <Router>
                <NProgress />
                <App />
            </Router>
        </PersistGate>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
