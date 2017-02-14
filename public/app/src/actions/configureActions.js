import { deleteCategory } from '../components/categoryConfigure'

export function getSelectedCategoryForChange (category, items) {
    return {
        type: 'GET_CATEGORY_FROM_STORAGE',
        category: category,
        itemsInCategory: items
    }
}
export function deleteSelectedCategory (category) {
    return {
        type: 'DELETE_SELECTED_CATEGORY',
        payload: deleteCategory(category)
    }
}
export function deleteItemInSelectedCategory (itemsInCategory) {
    return {
        type: 'DELETE_ITEM_IN_SELECTED_CATEGORY',
        payload: itemsInCategory
    }
}
export function fadeOn () {
    return {
        type: 'FADE_ON',
        payload: 'backdrop'
    }
}
export function fadeOff () {
    return {
        type: 'FADE_OFF',
        payload: 'clear'
    }
}
export function changeButtonState() {
    return {
        type: 'CHANGE_BUTTON_STATE',
        payload: true
    }
}
export function hideForm() {
    return {
        type: 'HIDE_FORM',
        payload: false
    }
}
export function showMessage() {
    return {
        type: 'SHOW_MESSAGE',
        payload: 'You have successed changed category name'
    }
}
export function hideMessage() {
    return {
        type: 'HIDE_MESSAGE',
        payload: ''
    }
}
