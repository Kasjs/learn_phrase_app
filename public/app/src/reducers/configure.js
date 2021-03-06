export const initialState = {
    selectedCategory: '',
    itemsInCategory: [],
    hide: '',
    showSpinner: false,
    isClicked: false,
    isSubmit: false,
    message: ''
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
        case 'FADE_ON': {
            return {
                ...state,
                hide: action.payload,
                showSpinner: !state.showSpinner
            }
        }
        case 'FADE_OFF': {
            return {
                ...state,
                hide: action.payload,
                showSpinner: !state.showSpinner
            }
        }
        case 'CHANGE_BUTTON_STATE': {
            return {
                ...state,
                isClicked: action.payload
            }
        }
        case 'HIDE_FORM': {
            return {
                ...state,
                isClicked: action.payload
            }
        }
        case 'SHOW_MESSAGE': {
            return {
                ...state,
                message: action.payload
            }
        }
        case 'HIDE_MESSAGE': {
            return {
                ...state,
                message: action.payload
            }
        }
        case 'DISABLE_BUTTON': {
            return {
                ...state,
                isSubmit: action.payload
            }
        }
        case 'ACTIVATE_BUTTON': {
            return {
                ...state,
                isSubmit: action.payload
            }
        }
        default:
        return state;
    }
}
