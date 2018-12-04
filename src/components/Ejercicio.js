import React from 'react';
import { IgualPerimetroRender } from './editor/perimetro/DibujaIgualPerimetro';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import { 
    Grid,
    Modal
} from '@material-ui/core';

import { startOpenCloseModal } from '../actions/appstate';

/* INICIO IMPORT DE COMPONENTES */
import Variables from './variables/Variables';
import EditaIgualPerimetro from './editor/perimetro/EditaIgualPerimetro';
/* TERMINO IMPORT DE COMPONENTES */

const styles = theme => ({
    components: {
        position: 'absolute',
        top: 60,
        left: 60,
        right: 60,
        bottom: 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: 20
    },
});

class Ejercicio extends React.Component {
    constructor(props) {
        super(props);
        this.iframe = React.createRef();
    }

    handleCloseComponent = () => {
        this.props.startOpenCloseModal();
    }

    getVariablesYVersion = () => {
        const { eje, ver } = this.props.match.params;
        const variables = this.props.variables[eje];
        const versiones = this.props.versiones[eje];
        var version;
        if(versiones && ver !== 'vt') {
            version = versiones.find(item => item.id === ver);
        } else if(variables && ver === 'vt') {
            version = {};
            for(var i = 0; i < variables.length; i++) {
                version[variables[i].nombre] = variables[i].vt;
            }
        }
        return { variables, version };
    }

    handleHtml = () => {
        const { version } = this.getVariablesYVersion();
        const document = this.iframe.current.contentDocument;
        var element = document.createElement("div");
        var props = { lado: 10, color: '#ff0000', alto: 'b', ancho: 'a', version };
        IgualPerimetroRender(props, element);
        document.getElementById("container").appendChild(element);
    }

    render() {
        const { eje, ver } = this.props.match.params;
        const { classes, appState } = this.props;
        const { variables, version } = this.getVariablesYVersion();
        return (
            <Grid container>
                <Grid item lg={12}>
                <h1>Ejercicio: {eje} version: {ver}</h1>
                <div>
                    <iframe ref={this.iframe} src="/dist/iframe.html"></iframe>
                    <button onClick={this.handleHtml}>Envia html</button>
                </div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={appState.modalIsOpen}
                    onClose={this.handleCloseComponent}
                >
                    <div className={classes.components}>
                        { getComponent(appState.componentName, { eje, variables, version }) }
                    </div>
                </Modal>
                </Grid>
            </Grid>
        );
    }
}

const getComponent = (componentName, props) => {
    switch(componentName) {
        case 'Variables':
            return <Variables {...props} />
        case 'Igual Perimetro':
            return <EditaIgualPerimetro {...props} />
        default:
            return undefined;
    }  
};

const mapDispatchToProps = (dispatch) => ({
    startOpenCloseModal: () => dispatch(startOpenCloseModal())
});

const mapStateToProps = (state) => ({
    variables: state.variables,
    versiones: state.versiones,
    appState: state.appState,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Ejercicio);