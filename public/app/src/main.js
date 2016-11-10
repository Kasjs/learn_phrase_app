import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Register from './components/RegisterForm'
import Login from './components/LoginForm'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import page from './reducers/page'
import { routerReducer } from 'react-router-redux'
import { modelReducer, formReducer } from 'react-redux-form'


injectTapEventPlugin();
const initialUserState= {
    email: '',
    password: '',
    repPassword: ''
}
const store = createStore(
    combineReducers({
        page: page,
        routing: routerReducer,
        user: modelReducer('user', initialUserState),
        userForm: formReducer('user', initialUserState)
    })
);
const history = syncHistoryWithStore(browserHistory, store);


render(
    <Provider store={store}>
        <div>
        <Router history={history}>
            <Route path="/" component={App}></Route>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
        </Router>
        </div>
    </Provider>,
    document.getElementById('app')
)
