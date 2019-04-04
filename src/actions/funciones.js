export const regexVariables = (texto, version) => {
    let result = texto.replace(/(\$[a-z])/g, function(coincidencia) { //coincidencia ej: => '$a'
        let valor = Object.keys(version).find(key => key === coincidencia[1]);
        if(!valor) {
            return coincidencia;
        }
        return version[valor];
    });
    return result;
};

export const regexFunctions = (texto) => {
    let result = texto.replace(/(?=\{).*?(\})/g, function (coincidencia) { //coincidencia ej => '{funcion()}'
        let funcion = coincidencia.substr(1, coincidencia.length - 2).replace(/&gt;/g, '>').replace(/&lt;/g, '<');
        try {
            return eval(funcion);
        } catch (error) {
            console.log(error);
            return coincidencia;
        }
    });
    return result;
};

export function espacioMiles(texto) {
    let result = texto.replace(/\d{1,}(\.\d{1,})?/g, function (coincidencia) {
        if (coincidencia.length >= 4) {
            let arrayReverse = coincidencia.split("").reverse();
            for (var i = 0, count = 0, valor = ''; i < arrayReverse.length; i++) {
                count++;
                if (count === 3 && arrayReverse[i + 1]) {
                    valor = ' ' + arrayReverse[i] + valor;
                    count = 0;
                } else {
                    valor = arrayReverse[i] + valor;
                }
            }
            return valor;
        } else {
            return coincidencia;
        }
    });
    return result;
}
/*
ejemplo variable
nombre: "w"
restriccion: ""
tipo: "numero"
valor: "1...9"
vt: "5"
*/
export const generadorDeVersiones = (variables, numeroVersiones) => {
    let versiones = [];
    for(let i = 0, version={}; i < numeroVersiones; i++) {
        variables.forEach(variable => {
            let restriccion = regexVariables(variable.restriccion, version);
            switch(variable.tipo){
                case 'numero':
                    if(variable.valor.match(/\d{1,}\.\.\.\d{1,}/g)) {
                        let limites = variable.valor.split('...');
                        version[variable.nombre] = Math.floor(Math.random()*(Number(limites[1])-Number(limites[0])+1)+Number(limites[0]));
                    }
                    break;
                case 'funcion':
                        let valor = regexVariables(variable.valor, version);
                        version[variable.nombre] = eval(valor);
                    break;
                default:
                    break;
            }
        });
        versiones.push(version);
        version={}
    }
    return versiones;
};

export const numeroEnPalabras = (n) => {
    let e = Math.floor(Number(n))

    if (e == 0) return 'cero'
    else return Millones(e)

    function Unidades(n) {
        switch(n) {
            case 1: return 'uno'
            case 2: return 'dos'
            case 3: return 'tres'
            case 4: return 'cuatro'
            case 5: return 'cinco'
            case 6: return 'seis'
            case 7: return 'siete'
            case 8: return 'ocho'
            case 9: return 'nueve'
            default: return ''
        }
    }
    function Decenas(n){
        let d = Math.floor(n/10), u = n - (d * 10)

        switch(d) {
            case 1:
                switch(u)
                {
                    case 0: return 'diez';
                    case 1: return 'once';
                    case 2: return 'doce';
                    case 3: return 'trece';
                    case 4: return 'catorce';
                    case 5: return 'quince';
                    default: return 'dieci' + Unidades(u);
                }
            case 2:
                switch(u) {
                    case 0: return 'veinte';
                    default: return 'venti' + Unidades(u)
                }
            case 3: return DecenasY('treinta', u)
            case 4: return DecenasY('cuarenta', u)
            case 5: return DecenasY('cincuenta', u)
            case 6: return DecenasY('sesenta', u)
            case 7: return DecenasY('setenta', u)
            case 8: return DecenasY('ochenta', u)
            case 9: return DecenasY('noventa', u)
            case 0: return Unidades(u)
        }
        function DecenasY(s, u) {
            if (u > 0) return s + ' y ' + Unidades(u); else return s
        }
    }
    function Centenas(m) {
        let c = Math.floor(m / 100), d = m - (c * 100)

        switch(c) {
            case 1:
                if (d > 0) return 'ciento ' + Decenas(d)
                else return 'cien'
            case 2: return 'doscientos ' + Decenas(d)
            case 3: return 'trescientos ' + Decenas(d)
            case 4: return 'cuatrocientos ' + Decenas(d)
            case 5: return 'quinientos ' + Decenas(d)
            case 6: return 'seiscientos ' + Decenas(d)
            case 7: return 'setecientos ' + Decenas(d)
            case 8: return 'ochocientos ' + Decenas(d)
            case 9: return 'novecientos ' + Decenas(d)
            default: return Decenas(d)
        }
    }
    function Seccion(n, d, s, p) {
        let c = Math.floor(n / d), r = n - (c * d), l = ''

        if (c > 0) {
            if (c > 1) l = Centenas(c) + ' ' + p
            else l = s
        }
        if (r > 0) l += ''

        return l
    }
    function Miles(n) {
        let d = 1000, c = Math.floor(n / d), r = n - (c * d), sm = Seccion(n, d, 'mil', 'mil'), sc = Centenas(r)

        if (sm == '') return sc
        else return sm + ' ' + sc
    }
    function Millones(n) {
        let d = 1000000, c = Math.floor(n / d), r = n - (c * d), sg = Seccion(n, d, 'un millon ', 'millones '), sm = Miles(r)

        if (sg == '') return sm
        else return sg + ' ' + sm
    }
}