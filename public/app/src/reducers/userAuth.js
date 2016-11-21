import { browserHistory, hashHistory } from 'react-router'
import { register } from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'

const initialState = {
    email: getEmailFromLocalStrg() !== '' ?  getEmailFromLocalStrg() : '',
    password: '',
    status: 0,
    hidden: getHiddenFromLocalStrg() !== '' ? getHiddenFromLocalStrg() : '',
    msg: 'test'
}

export default function userAuth(state = initialState, action) {
    switch(action.type) {
        case 'POST_NEW_USER': {
            return {
                ...state,
                email: localStorage.getItem('email'),
                hidden: localStorage.getItem('hidden'),
                msg: ''
            }
        }
        case 'LOGIN_USER': {
            if (action.status === 400) {
                return {
                    ...state,
                    email: '',
                    hidden: false,
                    status: 400,
                    msg: 'You have entered incorrect email or password'
                }
            } else {
                return {
                    ...state,
                    email: localStorage.getItem('email'),
                    hidden: localStorage.getItem('hidden'),
                    status: 200,
                    msg: 'ok'
                }
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
