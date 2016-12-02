import { browserHistory, hashHistory } from 'react-router'
import { register } from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'

const initialState = {
    email: getEmailFromLocalStrg() !== '' ?  getEmailFromLocalStrg() : '',
    password: '',
    status: 0,
    isAuthButtonsHidden: getHiddenFromLocalStrg() !== '' ? getHiddenFromLocalStrg() : '',
    msgEmail: '',
    msgPassword: '',
    msgCategory: ''
}

export default function userAuth(state = initialState, action) {
    switch(action.type) {
        case 'POST_NEW_USER': {
            return {
                ...state
            }
        }
        case 'LOGIN_USER': {
            if (action.status === 400) {
                return {
                    ...state,
                    email: '',
                    isAuthButtonsHidden: false,
                    status: 400
                }
            } else {
                return {
                    ...state,
                    email: localStorage.getItem('email'),
                    isAuthButtonsHidden: localStorage.getItem('isAuthButtonsHidden'),
                    status: 200
                }
            }
        }

        case 'CLEAR_PAGE_INFO_AND_LOGOUT': {
            return {
                ...state,
                isAuthButtonsHidden : action.hidden,
                email : action.email
            }
        }

        case 'SHOW_MASSAGE_EMAIL': {
            return {
                ...state,
                msgEmail: action.payload
            }
        }

        case 'SHOW_CATEGORY_MESSAGE': {
            return {
                ...state,
                msgCategory : action.payload
            }
        }

        default:
        return state
    }
}
