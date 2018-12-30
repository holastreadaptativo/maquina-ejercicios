import React from 'react';

class DibujaTexto extends React.Component {
    constructor(props) {
        super(props);
        this.contenido = React.createRef();
    }

    componentDidMount() {
        this.contenido.current.innerHTML = this.props.html;
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