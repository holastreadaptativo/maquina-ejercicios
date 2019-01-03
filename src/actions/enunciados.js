import database from '../database/firebase';
import { startShowHideMessage, showHideMessage } from './appstate';
import { orderBy } from 'lodash';

export const setEnunciados = (enunciados={}) => ({
    type: 'SET_ENUNCIADOS',
    enunciados
});

export const startSetEnunciados = () => {
    return (dispatch, getState) => {
        return database.ref('enunciados').once('value').then((snapshot) => {
            const enunciados = {};
            snapshot.forEach(childSnapshot => {
                if(childSnapshot.val() === '{}') {
                    enunciados[childSnapshot.key.toString()] = [];
                } else {
                    enunciados[childSnapshot.key.toString()] = Object.keys(childSnapshot.val()).map(key => ({
                        id: key,
                        ...childSnapshot.val()[key]
                    }))
                }
            });
            dispatch(setEnunciados(enunciados));
        }).catch((error) => {
            dispatch(startShowHideMessage(error.message));
        });
    };
};

export const addEnunciado = (idEjercicio, enunciado) => ({
    type: 'ADD_ENUNCIADO',
    idEjercicio,
    enunciado
});

export const startAddEnunciado = (idEjercicio, name, params) => {
    return (dispatch, getState) => {
        let enunciado;
        return database.ref(`enunciados/${idEjercicio}`).once('value').then(snapshot => {
            enunciado = {
                name,//'insertar texto'
                params,//{ datos }
                posicion: snapshot.val() === '{}' ? 1 : Object.keys(snapshot.val()).length + 1
            }
            return enunciado;
        }).then(enunciado => {
            return database.ref(`enunciados/${idEjercicio}`).push(enunciado);
        }).then(ref => {
            dispatch(addEnunciado(idEjercicio, {
                id: ref.key,
                ...enunciado
            }));
        }).catch(error => {
            console.log(error);
            dispatch(startShowHideMessage(error.message))
        });
        
    };
};

export const deleteEnunciado = (idEjercicio, idEnunciado, updates) => ({
    type: 'DELETE_ENUNCIADO',
    idEjercicio,
    idEnunciado,
    updates
});

export const startDeleteEnunciado = (idEjercicio, idEnunciado) => {
    return (dispatch, getState) => {
        let enunciados = getState().enunciados[idEjercicio]
            .filter(x => x.id !== idEnunciado);
        enunciados = orderBy(enunciados, ['posicion'], ['asc']);
        for(var i = 1; i < enunciados.length+1; i++) {
            enunciados[i-1].posicion = i;
        }
        dispatch(deleteEnunciado(idEjercicio, idEnunciado, enunciados));
        return database.ref(`enunciados/${idEjercicio}/${idEnunciado}`).remove().then(() => {
            return database.ref(`enunciados/${idEjercicio}`).once('value');
        }).then(snapshot => {

        }).catch(error => {
            console.log(error);
            dispatch(showHideMessage(error.message));
        });
    };
};