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

injectTapEventPlugin();
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}></Route>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Router>
    </Provider>,
    document.getElementById('app')
)
