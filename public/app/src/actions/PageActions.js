'use scrict'
import { getCategoryFromServer, syncWithServer } from '../ajaxCalls/request'
import { setCat } from '../localStorage/localStorageMethods'

export function getSelected() {
    return JSON.parse(localStorage.getItem('selected'));
}
function getCategoryFromStorage() {
    return JSON.parse(localStorage.getItem('categories_' + getSelected()));
}

export function getBackPhrase() {
    return {
        type: 'GET_BACK_PHRASE_REQUEST',
        payload: setCat.length === 0 ? getCategoryFromStorage() : setCat
    }
}

export function getNextPhrase() {
    return {
        type: 'GET_NEXT_PHRASE_REQUEST',
        payload: setCat.length === 0 ? getCategoryFromStorage() : setCat
    }
}

export function getRandomPhrase() {
    return {
        type: 'GET_RANDOM_PHRASE_REQUEST',
        payload: setCat.length === 0 ? getCategoryFromStorage() : setCat
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
        payload: setCat.length === 0 ? getCategoryFromStorage() : setCat
    }
}

export function getSelectedCategory(value) {
    return {
        type: 'GET_SELECTED_CATEGORY',
        payload: getCategoryFromServer()
    }
}

export function syncCatAndRating() {
    return {
        type: 'SYNC_CAT_AND_RATING',
        payload: syncWithServer()
    }
}

export function clearPageInfo() {
    return {
        type: 'CLEAR_PAGE_INFO_AND_LOGOUT'
    }
}

export function updateCategoryContent() {
    return {
        type: 'UPDATE_CATEGORY_CONTENT'
    }
}
export function switchOfflineOnLineMode() {
    return {
        type: 'SWITCH_OFFLINE_ONLINE_MODE'
    }
}
export function showMsgUnauthorizedUsers() {
    return {
        type: 'SHOW_MSG_UNAUTHORIZED_UZERS',
        payload: 'First you have to Sign In.'
    }
}
export function clearMsgUnauthorizedUsers() {
    return {
        type: 'CLEAR_MSG_UNAUTHORIZED_UZERS',
        payload: ''
    }
}

export function addNewCategoryAndItem() {
    return {
        type: 'ADD_NEW_CATEGORY_AND_ITEM',
        payload: 'You have added new category or updated existing one'
    }
}

export function clearAddNewCategoryMsg() {
    return {
        type: 'CLEAR_ADD_NEW_CATEGORY_MSG',
        payload: ''
    }
}

export function getCategoryName(categoryName) {
    return {
        type: 'GET_CATEGORY_NAME',
        payload: categoryName
    }
}
