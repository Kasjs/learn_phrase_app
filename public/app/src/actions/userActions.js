import {register} from '../ajaxCalls/request'

export function registerNewUser (user) {
    return {
        type: "POST_NEW_USER",
        payload: register(user)
    }
}
