import {register, login} from '../ajaxCalls/request'
import { setEmailToLocalStrg, setHiddenToLocalStrg, getEmailFromLocalStrg, getHiddenFromLocalStrg, logOut } from '../localStorage/localStorageMethods'
import { browserHistory, hashHistory } from 'react-router'

export function registerNewUser (user) {

    return {
        type: 'POST_NEW_USER',
        status: localStorage.getItem('status'),
        email: localStorage.getItem('email'),
        isAuthButtonsHidden: localStorage.getItem('isAuthButtonsHidden')
    }
}

export function loginUser (user) {

    return {
        type: 'LOGIN_USER',
        status: localStorage.getItem('status'),
        email: localStorage.getItem('email'),
        isAuthButtonsHidden: localStorage.getItem('isAuthButtonsHidden') ,
        msg: 'You have entered incorrect email or password'
    }

}

export function logOutUser() {
    logOut();
    return {
        type: 'LOG_OUT',
        isAuthButtonsHidden: false,
        email: ''
    }
}
export function getEmailFromStorage() {
    return {
        type: 'GET_EMAIL_FROM_STORAGE',
        payload: localStorage.getItem('email')
    }
}
