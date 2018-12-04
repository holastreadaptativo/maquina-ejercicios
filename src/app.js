import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import LoadingPage from './components/LoadingPage';
import AppRouter, { history } from './router/AppRouter';
import configureStore from './store/configureStore';
import configureTheme from './theme/configureTheme';
import { login, logout } from './actions/auth';
import { auth } from './database/firebase';
import { startSetEjercicios } from './actions/ejercicios';
import { startSetVariables } from './actions/variables';
import { startSetVersiones } from './actions/versiones';

const store = configureStore();
const theme = configureTheme();

const jsx = (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <AppRouter />
        </MuiThemeProvider>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

auth.onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login( user ));
        Promise.all([
            store.dispatch(startSetEjercicios()),
            store.dispatch(startSetVariables()),
            store.dispatch(startSetVersiones())
        ]).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/home');
            }
        })
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});



