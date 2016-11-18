import { browserHistory, hashHistory } from 'react-router'
import { register } from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'

const initialState = {
    email: '',
    password: '',
    isAuth: '',
    clearStorage: '',
    hidden: false
}

export default function userAuth(state = initialState, action) {
    switch(action.type) {
        case 'POST_NEW_USER': {
            return {
                ...state,
                email: getEmailFromLocalStrg(),
                hidden: getHiddenFromLocalStrg(),
                clearStorage: localStorage.clear()
            }
        }

        case 'LOG_OUT': {
            return {
                ...state,
                hidden : action.hidden,
                email : action.email
            }
        }

        default:
        return state
    }
}
