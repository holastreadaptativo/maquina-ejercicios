import database from '../database/firebase';
import { startShowHideMessage } from './appstate';

export const setVersiones = (versiones = {}) => ({
    type: 'SET_VERSIONES',
    versiones
});

export const startSetVersiones = () => {
    return (dispatch, getState) => {
        return database.ref('versiones').once('value').then((snapshot) => {
            const versiones = {};
            snapshot.forEach(childSnapshot => {
                versiones[childSnapshot.key.toString()] = Object.keys(childSnapshot.val()).map(key => ({
                    id: key,
                    ...childSnapshot.val()[key]
                }))
            });
            dispatch(setVersiones(versiones));
        }).catch((error) => {
            dispatch(startShowHideMessage(error));
        });
    };
};

export const unsetVersiones = () => ({
    type: 'UNSET_VERSIONES'
});

