const initialState = {
  page: 'test',
  phrase: 'Firts Phrases',
  counter: 0
}

export default function page( state = initialState, action) {
  switch(action.type){
    case 'GET_NEXT_PHRASE_REQUEST': {
      return {...state, phrase: action.payload[state.counter++]}
    }
    default:
      return state
  }
}
