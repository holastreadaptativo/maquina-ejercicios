import React from 'react';
import Variables from '../components/variables/Variables';

export const getComponent = (componentName, props) => {
    switch(componentName) {
        case 'Variables':
            return <Variables {...props} />
        default:
            return undefined;
    }  
};

export const regexVariables = (texto, version) => {
    var result = texto.toString().replace(/(\$[a-z])/g, function(coincidencia) { //coincidencia ej: => '$a'
        var valor = Object.keys(version).find(key => key === coincidencia[1]);
        return version[valor];
    });
    return result;
};