export const regexVariables = (texto, version) => {
    var result = texto.toString().replace(/(\$[a-z])/g, function(coincidencia) { //coincidencia ej: => '$a'
        var valor = Object.keys(version).find(key => key === coincidencia[1]);
        return version[valor];
    });
    return result;
};

export const generarVersiones = (variables, numeroVersiones) => {
    var versiones = [];
    for(var i = 0, version={}; i < numeroVersiones; i++) {
        variables.forEach(variable => {
            var restriccion = regexVariables(variable.restriccion, version);
            var valor = regexVariables(variable.valor, version);
            switch(variable.tipo){
                case 'numero':

                    break;
                case 'funcion':
                        var valor = regexVariables(variable.valor, version);
                        version[variable.nombre] = eval(valor);
                    break;
                default:
                    break;
            }
        });
        versiones.push(version);
    }
    return versiones;
};