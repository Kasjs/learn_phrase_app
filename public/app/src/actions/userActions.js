import {register} from '../ajaxCalls/request'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg, logOut } from '../localStorage/localStorageMethods'
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

export function logOutUser() {
    logOut();
    return {
        type: 'LOG_OUT',
        hidden: false,
        email: ''
    }
}
export function getEmailFromStorage() {
    return {
        type: 'GET_EMAIL_FROM_STORAGE',
        payload: localStorage.getItem('email')
    }
}
