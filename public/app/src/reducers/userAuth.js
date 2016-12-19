'use scrict'

import { browserHistory, hashHistory } from 'react-router'
import { register } from '../ajaxCalls/request'
import { getEmailFromLocalStrg, getHiddenFromLocalStrg } from '../localStorage/localStorageMethods'

export const initialState = {
    email: getEmailFromLocalStrg() !== '' ?  getEmailFromLocalStrg() : '',
    password: '',
    status: 0,
    isAuthButtonsHidden: getHiddenFromLocalStrg() !== '' ? getHiddenFromLocalStrg() : '',
    clientMsg: '',
    serverMsg: '',
    msgCategory: ''
}

export default function userAuth(state = initialState, action) {
    switch(action.type) {
        case 'POST_NEW_USER': {
            return {
                ...state,
                serverMsg: action.serverMsg
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

        case 'SHOW_ERROR_MESSAGE': {
            return {
                ...state,
                clientMsg: action.clientMsg
            }
        }

        case 'CLEAR_ERROR_MESSAGE': {
            return {
                ...state,
                clientMsg: action.clientMsg,
                serverMsg: action.serverMsg,
                msgCategory: action.clientMsg
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
