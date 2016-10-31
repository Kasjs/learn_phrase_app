const initialState = {
  page: 'test',
  phrases: [],
  counter: 0
}

export default function page( state = initialState, action) {
  switch(action.type){
    case 'GET_NEXT_PHRASE_REQUEST': {
      return {...state; phrases.push(action.payload[counter])}
    }
    default:
      return state
  }
}
