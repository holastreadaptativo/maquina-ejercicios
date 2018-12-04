const ejerciciosDefaultState = [];

export default (state = ejerciciosDefaultState, action) => {
    switch(action.type) {
        case 'SET_EJERCICIOS':
            return action.ejercicios;
        case 'ADD_EJERCICIO':
            return [
                ...state,
                action.ejercicio
            ];
        case 'DELETE_EJERCICIO':
            return state.filter(({id}) => id !== action.id);
        default:
            return state;
    }
};