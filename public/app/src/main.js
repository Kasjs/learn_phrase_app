'use scrict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Register from './components/RegisterForm'
import categoryConfigure from './components/categoryConfigure'
import Login from './components/LoginForm'
import Category from './components/Category'
import Home from './components/Page'
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import FontAwesome from 'font-awesome/css/font-awesome.css'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as reducers from './reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { modelReducer, formReducer } from 'react-redux-form';

const initialNameState = {
    updated: ''
}

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
    user: modelReducer('user'),
    userForm: formReducer('user'),
    category: modelReducer('category', initialNameState),
    categoryForm: formReducer('category'),
    configureCat: modelReducer('configureCat'),
    configureCatForm: formReducer('configureCat')
});

const logger = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={ store }>
        <div className='main container-fluid'>
            <Router history={ history }>
                <Route path="/" component={ App }/>
                <Route path="login" component={ Login }/>
                <Route path="register" component={ Register }/>
                <Route path="addCategory" component={ Category }/>
                <Route path="configure" component={ categoryConfigure }/>
            </Router>
        </div>
    </Provider>,
    document.getElementById('app')
)

require('offline-plugin/runtime').install();
