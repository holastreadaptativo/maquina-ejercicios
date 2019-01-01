import React from 'react';
import { regexVariables } from '../../../actions/funciones'

class DibujaTexto extends React.Component {
    constructor(props) {
        super(props);
        this.contenido = React.createRef();
    }

    componentDidMount() {
        const { html, version } = this.props;
        this.contenido.current.innerHTML = regexVariables(html, version);
    }

    render() {
        const { col,colsm,colmd } = this.props;
        const cssClases = `col-${col} col-sm-${colsm} col-md-${colmd}`; 
        return (
            <div className={cssClases} ref={this.contenido}></div>
        );
    }
}

export default DibujaTexto;