export const openCloseModal = ({ componentName = undefined, modalIsOpen = false }) => ({
    type: 'HANDLE_OPEN_CLOSE_MODAL',
    appState: {
        modalIsOpen,
        componentName
    }
});

export const startOpenCloseModal = ( componentName = undefined ) => {
    return (dispatch, getState) => {
        var modalIsOpen = !getState().appState.modalIsOpen;
        dispatch(openCloseModal({
            componentName: modalIsOpen ? componentName : undefined,
            modalIsOpen
        }))
    };
};

export const showHideMessage = ({ messageIsShowed = false, message = undefined }) => ({
    type: 'HANDLE_SHOW_HIDE_MESSAGE',
    appState: {
        messageIsShowed,
        message
    }
});

export const startShowHideMessage = ( message = undefined ) => {
    return (dispatch, getState) => {
        var messageIsShowed = !getState().appState.messageIsShowed;
        dispatch(showHideMessage({
            messageIsShowed,
            message: messageIsShowed ? message : undefined
        }));
    };
};