import {register} from '../ajaxCalls/request'
import { setEmailToLocalStrg, setHiddenToLocalStrg } from '../localStorage/localStorageMethods'

export function registerNewUser (user) {
    console.log(user);
    return {
        type: 'POST_NEW_USER',
        payload: register(user),
        email: function() {
            return setEmailToLocalStrg(user.email)
        },
        hidden: function() {
            return setHiddenToLocalStrg()
        }
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
