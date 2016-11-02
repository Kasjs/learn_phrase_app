const initialState = {
  page: 'test',
  phrase: '',
  counter: 0
}

export default function page( state = initialState, action) {
  switch(action.type){
    case 'GET_NEXT_PHRASE_REQUEST': {
      return {...state, phrase: action.payload[state.counter = ++state.counter]}
    }
    case 'GET_BACK_PHRASE_REQUEST': {
      return {...state, phrase: action.payload[state.counter = --state.counter]}
    }
    case 'GET_RANDOM_PHRASE_REQUEST': {
      return {...state, phrase: action.payload[state.counter = Math.floor(Math.random() * action.payload.length)]}
    }
    default:
      return state
  }
}
