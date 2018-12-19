import database from '../database/firebase';
import { startShowHideMessage } from './appstate';

export const setEjercicios = (ejercicios = []) => ({
    type: 'SET_EJERCICIOS',
    ejercicios
});

export const startSetEjercicios = () => {
    return (dispatch, getState) => {
        return database.ref('ejercicios').once('value').then((snapshot) => {
            const ejercicios = [];
            snapshot.forEach((childSnapshot) => {
                ejercicios.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setEjercicios(ejercicios));
        }).catch((error) => {
            dispatch(startShowHideMessage(error.message));
        });
    };
};

export const addEjercicio = (ejercicio) => ({
    type: 'ADD_EJERCICIO',
    ejercicio
});

export const startAddEjercicio = (id, descripcion) => {
    return (dispatch, getState) => {
        return database.ref(`ejercicios/${id}`).once('value').then(snapshot => {
            if(snapshot.exists()) {
                throw new Error('El ejercicio ya existe');
            } else {
                return Promise.all([
                    database.ref(`ejercicios/${id}`).set({ descripcion }),
                    database.ref(`variables/${id}`).set('{}'),
                    database.ref(`versiones/${id}`).set('{}')
                ]);
            }
        }).then(() => {
            dispatch(addEjercicio({
                id,
                descripcion
            }));
        }).catch((error) => {
            dispatch(startShowHideMessage(error.message));
        });
    }
}

export const deleteEjercicio = (id) => ({
    type: 'DELETE_EJERCICIO',
    id
});

export const startDeleteEjercicio = (id) => {
    return (dispatch, getState) => {
        return Promise.all([
            database.ref(`ejercicios/${id}`).remove(),
            database.ref(`variables/${id}`).remove(),
            database.ref(`versiones/${id}`).remove()
        ]).then(() => {
            dispatch(deleteEjercicio(id));
        }).catch((error) => {
            dispatch(startShowHideMessage(error));
        });
    };
};