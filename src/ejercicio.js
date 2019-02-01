import React from 'react';
import ReactDOM from 'react-dom';

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

document.addEventListener('DOMContentLoaded', function(){
    try {
        const props = window._datos_;
        const div = document.createElement('div');
        div.innerText = window._datos_;
        document.body.appendChild(div);
        ReactDOM.render(<Ejercicio {...props} />, document.getElementById('ejercicio'));
    } catch(error) {
        ReactDOM.render(<Error error={error.message}/>, document.getElementById('ejercicio'));
    }
});
  
ReactDOM.render(<Loading />, document.getElementById('ejercicio'));
