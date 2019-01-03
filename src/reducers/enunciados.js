import { omit } from 'lodash';
const enunciadosDefaultState = {};

export default (state = enunciadosDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EJERCICIO':
            return {
                ...state,
                [action.ejercicio.id]: [ ]
            };
        case 'DELETE_EJERCICIO':
            return omit(state, action.id);
        case 'SET_ENUNCIADOS':
            return action.enunciados;
        case 'DELETE_ENUNCIADO':
            return {
                ...state,
                [action.idEjercicio]: state[action.idEjercicio]
                    .filter(x => x.id !== action.idEnunciado)
                    .map(enunciado => {
                        const updates = action.updates.find(x => x.id === enunciado.id);
                        return {
                            ...enunciado,
                            ...updates
                        }
                    })
            }
        case 'ADD_ENUNCIADO':
            return {
                ...state,
                [action.idEjercicio]: [ ...state[action.idEjercicio], action.enunciado ]
            };
        default:
            return state;
    }
}