export function getNextPhrase() {
  return {
    type: 'GET_NEXT_PHRASE_REQUEST',
    payload: ['one', 'two', 'three', 'car' ,'cat', 'dog', 'phone']
  }
}
export function getRandomPhrase() {
  return {
    type: 'GET_RANDOM_PHRASE_REQUEST',
    payload: ['one', 'two', 'three', 'car' ,'cat', 'dog', 'phone']
  }
}
