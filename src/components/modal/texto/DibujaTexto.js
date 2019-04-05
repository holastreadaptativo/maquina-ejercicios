import React from 'react';
import PropTypes from 'prop-types';
import { regexVariables, regexFunctions, espacioMiles } from '../../../actions/funciones'

class DibujaTexto extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { col,colsm,colmd,version,html } = this.props;
        const cssClases = `col-${col} col-sm-${colsm} col-md-${colmd}`; 
        let innerHtml;
        try {
            innerHtml = { __html: espacioMiles(regexFunctions(regexVariables(html, version))) };
        } catch(error) {
            innerHtml = { __html: error.message };
        }
        return (
            <div className={cssClases} dangerouslySetInnerHTML={innerHtml}/>
        );
    }
}

DibujaTexto.propTypes = {
    col: PropTypes.string.isRequired, //clase de bootstrap para mobile
    colsm: PropTypes.string.isRequired, //clase de bootstrap para tablet
    colmd: PropTypes.string.isRequired, //clase de bootstrap para escritorio
    html: PropTypes.string.isRequired, //string en html con tags de p h1 etc para poner texto
    version: PropTypes.object.isRequired // version para reemplazar variables
}

export default DibujaTexto;