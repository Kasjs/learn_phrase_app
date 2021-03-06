'use scrict'

import { localSync } from '../localStorage/localStorageMethods'

export const initialState = {
    isOffline: false,
    phrase: '',
    counter: 0,
    category: '',
    side: 'side_a',
    hits: 0,
    unAuthorizedMsg: '',
    addCategoryMsg: '',
    hide: '',
    showSpinner: false,
    welcomeText: 'Welcome to PG app, for continue please Sign In or Sign Up.'
}

export default function page( state = initialState, action) {
    switch(action.type){
        case 'GET_NEXT_PHRASE_REQUEST': {
            if(state.counter >= (action.payload.length -1)) {
                localSync(state.counter);
                return {
                    ...state,
                    phrase: action.payload[state.counter = 0][state.side],
                    hits: ++action.payload[state.counter].hits
                }
            }
            localSync(state.counter);
            return {
                ...state,
                phrase: action.payload[++state.counter][state.side],
                hits: ++action.payload[state.counter].hits
            }
        }

        case 'GET_BACK_PHRASE_REQUEST': {
            if(state.counter === 0) {
                localSync(state.counter);
                return {
                    ...state,
                    phrase: action.payload[state.counter = action.payload.length - 1][state.side],
                    hits: ++action.payload[state.counter].hits
                }
            }
            localSync(state.counter);
            return {
                ...state,
                phrase: action.payload[--state.counter][state.side],
                hits: ++action.payload[state.counter].hits
            }
        }

        case 'GET_RANDOM_PHRASE_REQUEST': {
            localSync(state.counter);
            return {
                ...state,
                phrase: action.payload[state.counter = Math.floor(Math.random() * action.payload.length)][state.side],
                hits: ++action.payload[state.counter].hits
            }
        }

        case 'GET_PHRASE': {
            return {
                ...state,
                phrase: action.payload[state.counter][state.side]
            }
        }

        case 'SWITCH_LANGUAGE': {
            return {
                ...state,
                side: state.side === 'side_a' ? 'side_b' : 'side_a'
            }
        }

        case 'GET_SELECTED_CATEGORY': {
            return {
                ...state,
                phrase: action.payload
            }
        }
        case 'SYNC_CAT_AND_RATING': {
            return {
                ...state,
                phrase: action.payload
            }
        }

        case 'CLEAR_PAGE_INFO_AND_LOGOUT': {
            return {
                ...state,
                phrase: '',
                hits: 0,
                counter: 0
            }
        }

        case 'UPDATE_CATEGORY_CONTENT': {
            return {
                ...state,
                phrase: '',
                hits: 0,
                counter: 0
            }
        }
        case 'SWITCH_OFFLINE_ONLINE_MODE': {
            return {
                ...state,
                isOffline: !state.isOffline
            }
        }
        case 'SHOW_MSG_UNAUTHORIZED_UZERS': {
            return {
                ...state,
                unAuthorizedMsg: action.payload
            }
        }
        case 'CLEAR_MSG_UNAUTHORIZED_UZERS': {
            return {
                ...state,
                unAuthorizedMsg: ''
            }
        }
        case 'GET_CATEGORY_NAME': {
            return {
                ...state,
                category: action.payload
            }
        }
        case 'ADD_NEW_CATEGORY_AND_ITEM': {
            return {
                ...state,
                addCategoryMsg: action.payload
            }
        }
        case 'CLEAR_ADD_NEW_CATEGORY_MSG': {
            return {
                ...state,
                addCategoryMsg: action.payload
            }
        }
        case 'FADE_ON': {
            return {
                ...state,
                hide: action.payload,
                showSpinner: !state.showSpinner
            }
        }
        case 'FADE_OFF': {
            return {
                ...state,
                hide: action.payload,
                showSpinner: !state.showSpinner
            }
        }

        default:
        return state
    }
}
