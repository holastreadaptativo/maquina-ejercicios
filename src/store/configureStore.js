import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import AppStateReducer from '../reducers/appstate';
import AuthStateReducer from '../reducers/auth'
import EjerciciosReducer from '../reducers/ejercicios';
import VariablesReducer from '../reducers/variables';
import VersionesReducer from '../reducers/versiones';

export default () => {
    const store = createStore(
        combineReducers({
            appState: AppStateReducer,
            user: AuthStateReducer,
            ejercicios: EjerciciosReducer,
            variables: VariablesReducer,
            versiones: VersionesReducer
        }), 
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};