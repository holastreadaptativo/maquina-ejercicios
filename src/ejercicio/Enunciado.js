import React from 'react';
import DibujaTexto from '../components/modal/texto/DibujaTexto';

class Enunciado extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { version, fnsEnunciados } = this.props;
        return (
            <div id="enunciado" className="row">
                {fnsEnunciados.map(enunciado => {
                    switch(enunciado.name) {
                        case 'Agregar Texto':
                            return <DibujaTexto key={enunciado.id} version={version} {...enunciado.params} />
                    }
                })}
            </div>
        );
    }
}

export default Enunciado;