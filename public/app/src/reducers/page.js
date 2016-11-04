const initialState = {
    page: 'test',
    phrase: '',
    counter: 0,
    lang: 'en'
}

export default function page( state = initialState, action) {
    switch(action.type){

        case 'GET_NEXT_PHRASE_REQUEST': {
            if(state.counter >= (action.payload.length -1)) {
                return {
                    ...state,
                    phrase: action.payload[state.counter = 0][state.lang]}
                }
            return {
                ...state,
                phrase: action.payload[state.counter = ++state.counter][state.lang]}
            }

        case 'GET_BACK_PHRASE_REQUEST': {
            if(state.counter === 0) {
                return {
                    ...state,
                    phrase: action.payload[state.counter = action.payload.length - 1][state.lang]}
                }
            return {
                ...state,
                phrase: action.payload[state.counter = --state.counter][state.lang]}
            }

        case 'GET_RANDOM_PHRASE_REQUEST': {
            return {
                ...state,
                phrase: action.payload[state.counter = Math.floor(Math.random() * action.payload.length)][state.lang]}
            }

        case 'GET_PHRASE': {
            return {
                ...state,
                phrase: action.payload[state.counter][state.lang]}
            }

        case 'SWITCH_LANGUAGE': {
            return {
                ...state,
                lang: state.lang === 'en' ? 'uk' : 'en'}
            }

        case 'GET_SELECTED_CATEGORY': {
            return {
                ...state,
                phrase: state.phrase = action.payload() }
            }

        default:
        return state
    }
}
