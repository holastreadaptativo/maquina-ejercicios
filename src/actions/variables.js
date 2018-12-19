import database from '../database/firebase';
import { startShowHideMessage } from './appstate';

export const setVariables = (variables = {}) => ({
    type: 'SET_VARIABLES',
    variables
});

export const startSetVariables = () => {
    return (dispatch, getState) => {
        return database.ref('variables').once('value').then((snapshot) => {
            const variables = {};
            snapshot.forEach(childSnapshot => {
                if(childSnapshot.val() === '{}') {
                    variables[childSnapshot.key.toString()] = [];
                } else {
                    variables[childSnapshot.key.toString()] = Object.keys(childSnapshot.val()).map(key => ({
                        id: key,
                        ...childSnapshot.val()[key]
                    }))
                }
            });
            dispatch(setVariables(variables));
        }).catch((error) => {
            dispatch(startShowHideMessage(error.message));
        });
    };
};

export const addVariable = (idEjercicio, variable = {}) => ({
    type: 'ADD_VARIABLE',
    idEjercicio,
    variable
});

export const startAddVariable = (idEjercicio, variable = {}) => {
    console.log(variable);
    return (dispatch, getState) => {
        return database.ref(`variables/${idEjercicio}`).push(variable).then((ref) => {
            dispatch(addVariable(idEjercicio, {
                id: ref.key,
                ...variable
            }));
        }).catch((error) => {
            console.log(error);
            dispatch(startShowHideMessage(error.message));
        });
    };
};

export const removeVariable = (idEjercicio, idVariable) => ({
    type: 'REMOVE_VARIABLE',
    idEjercicio,
    idVariable
});

export const startRemoveVariable = (idEjercicio, idVariable) => {
    return (dispatch, getState) => {
        return database.ref(`variables/${idEjercicio}/${idVariable}`).remove().then(() => {
            dispatch(removeVariable(idEjercicio, idVariable));
        }).catch(error => {
            dispatch(startShowHideMessage(error));
        });
    };
};

export const editVariable = (idEjercicio, idVariable, updates = {}) => ({
    type: 'EDIT_VARIABLE',
    idEjercicio,
    idVariable,
    updates
});

export const startEditVariable = (idEjercicio, idVariable, updates) => {
    return (dispatch, getState) => {
        return database.ref(`variables/${idEjercicio}/${idVariable}`).update(updates).then(() => {
            dispatch(editVariable(idEjercicio, idVariable, updates));
        }).catch(error => {
            dispatch(startShowHideMessage(error));
        });
    };
};