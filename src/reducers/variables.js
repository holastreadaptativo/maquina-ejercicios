import { omit } from 'lodash';
const variablesDefaultState = {};

export default (state = variablesDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EJERCICIO':
            return {
                ...state,
                [action.ejercicio.id]: [ ]
            };
        case 'DELETE_EJERCICIO':
            return omit(state, action.id);
        case 'SET_VARIABLES':
            return action.variables;
        case 'ADD_VARIABLE':
            return {
                ...state,
                [action.idEjercicio]: [ ...state[action.idEjercicio], action.variable ]
            };
        case 'EDIT_VARIABLE':
            return {
                ...state,
                [action.idEjercicio]: state[action.idEjercicio].map((variable) => {
                    if(variable.id === action.idVariable) {
                        return {
                            ...variable,
                            ...action.updates
                        };
                    } else {
                        return variable;
                    }
                })
            };
        case 'REMOVE_VARIABLE':
            return {
                ...state,
                [action.idEjercicio]: state[action.idEjercicio].filter(({id}) => id !== action.idVariable)
            };
        default:
            return state;
    }
};