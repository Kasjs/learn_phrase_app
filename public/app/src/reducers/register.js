const initialState = {
    email: '',
    password: '',
    newuser: false
}

export default function register(state = initialState, action) {
    switch(action.type) {
        case 'POST_NEW_USER': {
            return {
                ...state,
                newuser: true
            }
        }
    }
}
