import { browserHistory, hashHistory } from 'react-router'
import { register } from '../ajaxCalls/request'
import { getEmailFromLocalStrg } from '../localStorage/localStorageMethods'

const initialState = {
    email: getEmailFromLocalStrg() !== '' ? getEmailFromLocalStrg() :  '',
    password: '',
    isAuth: false,
    route: '',
    hidden: false
}

export default function userAuth(state = initialState, action) {
    switch(action.type) {
        case 'POST_NEW_USER': {
            console.log(action);
            return {
                ...state,
                email: action.email(),
                isAuth: !state.isAuth,
                hidden: action.hidden()
            }
        }

        case 'TOGGLE_USER': {
            return {
                ...state,
                hidden : !state.hidden
            }
        }

        default:
        return state
    }
}
