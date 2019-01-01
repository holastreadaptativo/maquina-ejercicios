import React from 'react';
import Enunciado from './Enunciado';

class Ejercicio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <section>
                    <div className="container-fluid">
                        <Enunciado {...this.props}/>
                        <div id="respuesta" className="row justify-content-center"></div>
                    </div>
                </section>
                <footer className="fixed-bottom pie">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-5 col-sm-3">
                                <button type="button" id="btnConsulta" className="btn btn-block">Consulta</button>
                                <img id="imgfeedback" className="img-fluid d-none" alt="IMG" />
                            </div>
                            <div className="col-2 col-sm-6">
                                <span></span>
                            </div>
                            <div className="col-5 col-sm-3">
                                <button type="button" id="btnResponder" className="btn btn-block float-right" disabled>Responder</button> 
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Ejercicio;