const appStateDefaultState = {
    modalIsOpen: false,
    componentName: undefined,
    messageIsShowed: false,
    message: undefined
};

export default (state = appStateDefaultState, action) => {
    switch(action.type) {
        case 'HANDLE_OPEN_CLOSE_MODAL':
            return {
                ...state,
                ...action.appState
            };
        case 'HANDLE_SHOW_HIDE_MESSAGE':
            return {
                ...state,
                ...action.appState
            }
        default:
            return state;
    }
};