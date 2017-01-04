import { deleteCategory, deleteItem } from '../components/categoryConfigure'

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