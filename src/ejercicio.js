import React from 'react';
import ReactDOM from 'react-dom';
import database from './database/firebase'

import Ejercicio from './ejercicio/Ejercicio';

const Loading = () => (
    <div>
        <h1>Cargando...</h1>
    </div>
);

const Error = (props) => (
    <div>
        <h1>Error: {props.error}</h1>
    </div>
);

const detalles = JSON.parse(document.body.getAttribute('data-info').replace(/'/g, '"'));
Promise.all([
    database.ref(`versiones/${detalles.ejercicio}/${detalles.version}`).once('value'),
    database.ref(`enunciados/${detalles.ejercicio}`).once('value')
]).then(([versionSnapshot, enunciadosSnapshot]) => {
    const fnsEnunciados = [];
    enunciadosSnapshot.forEach((childSnapshot) => {
        fnsEnunciados.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });
    const props = {
        version: versionSnapshot.val(),
        fnsEnunciados
    }
    ReactDOM.render(<Ejercicio {...props} />, document.getElementById('ejercicio'));
}).catch(error => {
    ReactDOM.render(<Error error={error.message} />, document.getElementById('ejercicio'));
});

ReactDOM.render(<Loading />, document.getElementById('ejercicio'));
