import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-5 col-sm-3">
                            <button type="button" id="btnConsulta" className="bton-5 bton-5a icon-consulta"><span>Consulta</span></button>
                        </div>
                        <div className="col-2 col-sm-6"></div>
                        <div className="col-5 col-sm-3">
                            <button type="button" id="btnResponder" className="bton-5 bton-5a icon-responder" disabled><span>Responder</span></button> 
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;