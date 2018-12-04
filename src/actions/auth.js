import { auth, googleAuthProvider } from '../database/firebase';
import { startShowHideMessage } from './appstate';

export const login = ( user = {} ) => ({
    type: 'LOGIN_EMAIL_PASSWORD',
    user
});

export const startLoginWithEmailAndPassword = (email, password) => {
    return (dispatch, getState) => {
        return auth.signInWithEmailAndPassword(email, password).then((user) => {
            dispatch(login( user ));
        }).catch((error) => {
            var msg = '';
            switch(error.code) {
                case 'auth/invalid-email':
                    msg = 'Correo inválido';
                    break;
                case 'auth/wrong-password':
                    msg = 'Contraseña mal ingresada';
                    break;
                default:
                    msg = 'Error desconocido';
                    break;
            }
            dispatch(startShowHideMessage(msg));
        });
    };
};

export const startLoginWithGoogle = () => {
    return () => {
        return auth.signInWithPopup(googleAuthProvider);
    }
};


export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        auth.signOut();
    };
};
