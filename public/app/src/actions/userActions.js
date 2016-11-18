import {register} from '../ajaxCalls/request'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'
import { browserHistory, hashHistory } from 'react-router'

export function registerNewUser (user) {
    register(user);
    hashHistory.push('/');
    return {
        type: 'POST_NEW_USER',
        email: localStorage.setItem('email', user.email),
        hidden: localStorage.setItem('hidden', true)
    }
}

export function toggleUser() {
    return {
        type: 'TOGGLE_USER'
    }
}
export function getEmailFromStorage() {
    return {
        type: 'GET_EMAIL_FROM_STORAGE',
        payload: localStorage.getItem('email')
    }
}
