import { createStore, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import combineReducers from '../reducers'
import { routerMiddleware, push } from 'react-router-redux'
import { Router, Route, browserHistory } from 'react-router'


export default function configureStore(initialState) {

    const middleware = routerMiddleware(browserHistory)
    const logger = createLogger()
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk),
        applyMiddleware(logger),
        initialState);
        if (module.hot) {
            module.hot.accept('../reducers', () => {
                const nextRootReducer = require('../reducers')
                store.replaceReducer(nextRootReducer)
            })
        }
        return store
}
