import {arrayOfData} from '../arrayOfData'

export function getBackPhrase() {
  return {
    type: 'GET_BACK_PHRASE_REQUEST',
    payload: arrayOfData
  }
}
export function getNextPhrase() {
  return {
    type: 'GET_NEXT_PHRASE_REQUEST',
    payload: arrayOfData
  }
}
export function getRandomPhrase() {
  return {
    type: 'GET_RANDOM_PHRASE_REQUEST',
    payload: arrayOfData
  }
}
export function switchLanguage() {
  return {
    type: 'SWITCH_LANGUAGE'
  }
}
export function getPhrase() {
  return {
    type: 'GET_PHRASE',
    payload: arrayOfData
  }
}
