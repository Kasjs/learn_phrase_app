import { localSync } from '../localStorage/localStorageMethods'

const initialState = {
    page: 'test',
    phrase: '',
    counter: 0,
    side: 'side_a',
    hits: 0

}

export default function page( state = initialState, action) {
    switch(action.type){
        case 'GET_NEXT_PHRASE_REQUEST': {
            if(state.counter >= (action.payload.length -1)) {
                localSync(state.counter);
                return {
                    ...state,
                    phrase: action.payload[state.counter = 0][state.side],
                    hits: ++action.payload[state.counter].hits,
                }
            }
            localSync(state.counter);
            return {
                ...state,
                phrase: action.payload[state.counter = ++state.counter][state.side],
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
                phrase: action.payload[state.counter = --state.counter][state.side],
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
                phrase: state.phrase = action.payload
            }
        }
        case 'SYNC_CAT_AND_RATING': {
            return {
                ...state,
                phrase: state.phrase = action.payload
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

        default:
        return state
    }
}
