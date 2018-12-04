const versionesDefaultState = {};

export default (state = versionesDefaultState, action) => {
    switch(action.type) {
        case 'SET_VERSIONES':
            return action.versiones;
        case 'UNSET_VERSIONES':
            return versionesDefaultState;
        default:
            return state;
    }
};