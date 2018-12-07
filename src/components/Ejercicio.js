import React from 'react';
import { IgualPerimetroRender } from './editor/perimetro/DibujaIgualPerimetro';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
        this.state = {
            value: 2
        }
    }

    handleCloseComponent = () => {
        this.props.startOpenCloseModal();
    }

    handleChange = (event, value) => {
        this.setState({ value });
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

    componentDidMount() {
        this.handleIFrame();
    }

    componentDidUpdate() {
        this.handleIFrame();
    }

    handleIFrame = () => {
        switch(this.state.value) {
            case 0:
                this.iframe.current.width = 375;
                this.iframe.current.height = 667;
                break;
            case 1:
                this.iframe.current.width = 768;
                this.iframe.current.height = 800;
                break;
            case 2:
                this.iframe.current.width = 1200;
                this.iframe.current.height = 630;
                break;
        }
    }

    render() {
        const { eje, ver } = this.props.match.params;
        const { classes, appState } = this.props;
        const { variables, version } = this.getVariablesYVersion();
        
        return (
            <Grid container spacing={8}>
                <Grid item lg={4}>

                </Grid>
                <Grid item lg={4}>

                </Grid>
                <Grid item lg={4}>
                    <Paper square>
                        <Tabs
                            value={this.state.value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <Tab label="Mobile" />
                            <Tab label="Tablet" />
                            <Tab label="Desktop" />
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item lg={12} justify="center">
                    <iframe className={classes.iframe} ref={this.iframe} src="/dist/iframe.html"></iframe>
                    <button onClick={this.handleHtml}>Envia html</button>
                </Grid>
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