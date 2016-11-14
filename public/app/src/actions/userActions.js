import {register} from '../ajaxCalls/request'

export function registerNewUser (user) {
    return {
        type: 'POST_NEW_USER',
        payload: register(user),
        email: user.email
    }
}

export function toggleUser() {
    return {
        type: 'TOGGLE_USER'
    }
}
