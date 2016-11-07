let localSync = function(index) {
    let catagories = JSON.parse(localStorage.getItem('catagories'));
    ++catagories[index].rating;
    localStorage.setItem('catagories', JSON.stringify(catagories));
}

const initialState = {
    page: 'test',
    phrase: '',
    counter: 0,
    lang: 'en',
    rating: 0

}

export default function page( state = initialState, action) {
    switch(action.type){
        case 'GET_NEXT_PHRASE_REQUEST': {
            if(state.counter >= (action.payload.length -1)) {
                localSync(state.counter);
                return {
                    ...state,
                    phrase: action.payload[state.counter = 0][state.lang],
                    rating: ++action.payload[state.counter].rating,
                }
            }
            localSync(state.counter);
            return {
                ...state,
                phrase: action.payload[state.counter = ++state.counter][state.lang],
                rating: ++action.payload[state.counter].rating

            }
        }

        case 'GET_BACK_PHRASE_REQUEST': {
            if(state.counter === 0) {
                localSync(state.counter);
                return {
                    ...state,
                    phrase: action.payload[state.counter = action.payload.length - 1][state.lang],
                    rating: ++action.payload[state.counter].rating
                }
            }
            localSync(state.counter);
            return {
                ...state,
                phrase: action.payload[state.counter = --state.counter][state.lang],
                rating: ++action.payload[state.counter].rating
            }
        }

        case 'GET_RANDOM_PHRASE_REQUEST': {
            localSync(state.counter);
            return {
                ...state,
                phrase: action.payload[state.counter = Math.floor(Math.random() * action.payload.length)][state.lang],
                rating: ++action.payload[state.counter].rating
            }
        }

        case 'GET_PHRASE': {
            return {
                ...state,
                phrase: action.payload[state.counter][state.lang]
            }
        }

        case 'SWITCH_LANGUAGE': {
            return {
                ...state,
                lang: state.lang === 'en' ? 'uk' : 'en'
            }
        }

        case 'GET_SELECTED_CATEGORY': {
            return {
                ...state,
                phrase: state.phrase = action.payload()
            }
        }
        case 'SYNC_CAT_AND_RATING': {
            return {
                ...state,
                phrase: state.phrase = action.payload()
            }
        }

        default:
        return state
    }
}
