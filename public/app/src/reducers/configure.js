export const initialState = {
    selectedCategory: '',
    itemsInCategory: []
}

export default function category( state = initialState, action) {
    switch(action.type) {
        case 'GET_CATEGORY_FROM_STORAGE': {
            return {
                ...state,
                selectedCategory: action.category,
                itemsInCategory: action.itemsInCategory
            }
        }
        case 'DELETE_SELECTED_CATEGORY': {
            return {
                ...state,
                selectedCategory: '',
                itemsInCategory: ''
            }
        }
        case 'DELETE_ITEM_IN_SELECTED_CATEGORY': {
            return {
                ...state,
                itemsInCategory: action.payload
            }
        }
        default:
        return state;
    }
}
