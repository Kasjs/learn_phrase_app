const initialState = {
    name: []
}

export default function user(state = initialState, action) {
    switch(action.type){
        case 'GET_SELECTED_CATEGORY': {
            return {...state, name: state.name = action.payload() }
        }
        default:
        return state
    }
}
