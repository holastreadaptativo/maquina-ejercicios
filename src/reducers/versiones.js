import { omit } from 'lodash';
const versionesDefaultState = {};

export default (state = versionesDefaultState, action) => {
    switch(action.type) {
        case 'SET_VERSIONES':
            return action.versiones;
        case 'UNSET_VERSIONES':
            return versionesDefaultState;
        case 'DELETE_EJERCICIO':
            return omit(state, action.id);
        default:
            return state;
    }
};