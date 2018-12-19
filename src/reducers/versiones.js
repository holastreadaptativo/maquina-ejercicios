import { omit } from 'lodash';
const versionesDefaultState = {};

export default (state = versionesDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EJERCICIO':
            return {
                ...state,
                [action.ejercicio.id]: [ ]
            };
        case 'DELETE_EJERCICIO':
            return omit(state, action.id);
        case 'SET_VERSIONES':
            return action.versiones;
        case 'GENERAR_VERSIONES':
            return {
                ...state,
                [action.idEjercicio]: state[action.idEjercicio].concat(action.versiones)
            }
        case 'UNSET_VERSIONES':
            return versionesDefaultState;
        default:
            return state;
    }
};