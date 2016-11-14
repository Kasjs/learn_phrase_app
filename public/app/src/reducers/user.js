const initialState = {
    email: 'test',
    password: '',
    newuser: false,
    route: '',
    hidden: true
}

export default function user(state = initialState, action) {
    switch(action.type) {
        case 'POST_NEW_USER': {
            return {
                ...state,
                email: action.email,
                newuser: true
            }
        }
        case 'TOGGLE_USER': {
            return {
                ...state,
                hidden : !state.hidden
            }
        }
        default:
        return state
    }
}
