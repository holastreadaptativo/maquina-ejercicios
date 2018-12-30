import database from '../database/firebase';
import { startShowHideMessage } from './appstate';

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

export const startAddEnunciado = (idEjercicio,name,params) => {
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