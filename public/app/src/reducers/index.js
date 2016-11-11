import { combineReducers } from 'redux'
import page from './page'
import register from './register'
import { routerReducer } from 'react-router-redux'
import { modelReducer, formReducer } from 'react-redux-form'

const initialUserState= {
    email: '',
    password: ''
}
export default combineReducers({
    page,
    register,
    routing: routerReducer,
    user: modelReducer('user', initialUserState),
    userForm: formReducer('user', initialUserState)
})
