import React from 'react';
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

export default DibujaTexto;