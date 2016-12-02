import {register, login} from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getHiddenFromLocalStrg, getStatusFromLocalStrg, logOut } from '../localStorage/localStorageMethods'
import { browserHistory, hashHistory } from 'react-router'

export function registerNewUser (user) {
    register(user);
    return {
        type: 'POST_NEW_USER'
    }
}

export function loginUser (user) {
    login(user);
    return {
        type: 'LOGIN_USER',
        status: getStatusFromLocalStrg(),
        email: getEmailFromLocalStrg(),
        isAuthButtonsHidden: getHiddenFromLocalStrg()
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

export function showEmailMassage() {
    return {
        type: 'SHOW_MASSAGE_EMAIL',
        payload: 'Please fill out all fields'
    }
}

export function showCategoryMassage() {
    return {
        type: 'SHOW_CATEGORY_MESSAGE',
        payload: 'Please fill out all fields'
    }
}
