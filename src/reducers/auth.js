const authDefaultState = {};

export default (state = authDefaultState, action) => {
    switch(action.type) {
        case 'LOGIN_EMAIL_PASSWORD':
            return action.user;
        case 'LOGOUT':
            return authDefaultState;
        default:
            return state;
    }
};