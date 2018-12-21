import database from '../database/firebase';
import { startShowHideMessage } from './appstate';
import { generadorDeVersiones } from './funciones';
import nuid from 'number-uid';

export const setVersiones = (versiones = {}) => ({
    type: 'SET_VERSIONES',
    versiones
});

export const startSetVersiones = () => {
    return (dispatch, getState) => {
        return database.ref('versiones').once('value').then((snapshot) => {
            const versiones = {};
            snapshot.forEach(childSnapshot => {
                if(childSnapshot.val() === '{}') {
                    versiones[childSnapshot.key.toString()] = [];
                } else {
                    versiones[childSnapshot.key.toString()] = Object.keys(childSnapshot.val()).map(key => ({
                        id: key,
                        ...childSnapshot.val()[key]
                    }))
                }
            });
            dispatch(setVersiones(versiones));
        }).catch((error) => {
            dispatch(startShowHideMessage(error.message));
        });
    };
};

export const generarVersiones = (idEjercicio, versiones) => ({
    type: 'GENERAR_VERSIONES',
    idEjercicio,
    versiones
});

export const startGenerarVersiones = (idEjercicio, variables, numeroVersiones) => {
    return (dispatch, getState) => {
        try {
            var versiones = generadorDeVersiones(variables, numeroVersiones);
            if(versiones.length !== numeroVersiones) {
                throw new Error('Error al generar versiones');
            }
        } catch(error) {
            dispatch(startShowHideMessage(error.message));
        }
        let uid;
        return database.ref(`versiones/${idEjercicio}`).set('{}').then(()=> {
            let versionesGeneradas = versiones.map(version => {
                uid = nuid(5);
                database.ref(`versiones/${idEjercicio}/${uid}`).set(version).then(()=>{
                    console.log('version agregada =>', version);
                }).catch((error) => {
                    console.log('error al agregar =>', error);
                });
                return {
                    id: uid,
                    ...version
                }
            });
            dispatch(generarVersiones(idEjercicio, versionesGeneradas));
        }).catch((error) => {
            dispatch(startShowHideMessage(error.message));
        });
    };
};

export const updateVersion = (idEjercicio, idVersion, updates) => ({
    type: 'UPDATE_VERSION',
    idEjercicio,
    idVersion,
    updates
});

export const startUpdateVersion = (idEjercicio, idVersion, variables) => {
    console.log(idEjercicio, idVersion);
    return (dispatch, getState) => {
        try {
            var updates = generadorDeVersiones(variables, 1);
            if(updates.length === 0) {
                throw new Error('Error al generar nueva version');
            }
        } catch(error) {
            dispatch(startShowHideMessage(error.message));
        }
        return database.ref(`versiones/${idEjercicio}/${idVersion}`).update(updates[0]).then(()=>{
            dispatch(updateVersion(idEjercicio, idVersion, updates[0]));
        }).catch((error)=>{
            dispatch(startShowHideMessage(error.message));
        });
    }
};

