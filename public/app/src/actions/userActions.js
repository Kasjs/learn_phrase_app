import {register, login} from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getHiddenFromLocalStrg, getStatusFromLocalStrg, logOut } from '../localStorage/localStorageMethods'
import { browserHistory, hashHistory } from 'react-router'

export function registerNewUser (user) {
    return {
        type: 'POST_NEW_USER'
    }
}

export function loginUser (user) {
    return {
        type: 'LOGIN_USER',
        status: getStatusFromLocalStrg(),
        email: getEmailFromLocalStrg(),
        isAuthButtonsHidden: getHiddenFromLocalStrg(),
        msg: 'You have entered incorrect email or password'
    }
}

export function logOutUser() {
    logOut();
    return {
        type: 'CLEAR_PAGE_INFO_AND_LOGOUT',
        isAuthButtonsHidden: false,
        email: ''
    }
}
