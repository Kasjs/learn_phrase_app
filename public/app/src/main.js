import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Register from './components/RegisterForm'
import Login from './components/LoginForm'
import Home from './components/Page'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, hashHistory, IndexRoute, browserHistory, useRouterHistory  } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as reducers from './reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { modelReducer, formReducer } from 'react-redux-form';

const initialUserState= {
    email: '',
    password: ''
}

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
    user: modelReducer('user'),
    userForm: formReducer('user')
})

injectTapEventPlugin();

const logger = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <div className='main'>
            <Router history={history}>
                <Route path="/" component={App}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
            </Router>
        </div>
    </Provider>,
    document.getElementById('app')
)
