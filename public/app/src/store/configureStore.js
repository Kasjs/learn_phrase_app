import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'

export default function configureStore(initialState) {
    const logger = createLogger()
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(logger))
        if (module.hot) {
            module.hot.accept('../reducers', () => {
                const nextRootReducer = require('../reducers')
                store.replaceReducer(nextRootReducer)
            })
        }
        return store
}
