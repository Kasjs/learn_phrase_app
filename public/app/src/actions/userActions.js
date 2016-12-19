'use scrict'
import { register, login, transferServerMsg } from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getHiddenFromLocalStrg, getStatusFromLocalStrg, logOut } from '../localStorage/localStorageMethods'
import { browserHistory, hashHistory } from 'react-router'

export function registerNewUser (user) {
    register(user);
    return {
        type: 'POST_NEW_USER',
        payload: localStorage.getItem('errorMsg')
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

export function showErrorMsg() {
    return {
        type: 'SHOW_ERROR_MESSAGE',
        clientMsg: 'Please fill out all fields'
    }
}

export function clearErrorMsg() {
    localStorage.setItem('errorMsg', '');
    return {
        type: 'CLEAR_ERROR_MESSAGE',
        clientMsg: ''
    }
}

export function showCategoryMassage() {
    return {
        type: 'SHOW_CATEGORY_MESSAGE',
        payload: 'Please fill out all fields'
    }
}
