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
                [action.idEjercicio]: state[action.idEjercicio].filter(version => false).concat(action.versiones)
            }
        case 'UPDATE_VERSION':
            return {
                ...state,
                [action.idEjercicio]: state[action.idEjercicio].map((version) => {
                    if(version.id === action.idVersion) {
                        return {
                            ...version,
                            ...action.updates
                        }
                    } else {
                        return version;
                    }
                })
            }
        default:
            return state;
    }
};