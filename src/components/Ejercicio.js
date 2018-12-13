import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import LeftDrawer from './drawer/LeftDrawer';
import { startOpenCloseModal } from '../actions/appstate';
//componentes
import Variables from './modal/variables/Variables';


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

    getDetails = () => {
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
        return { eje, ver, variables, version, versiones };
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
        const { classes, appState } = this.props;
        const detalles = this.getDetails()
        console.log(this.props);
        return (
            <main className={classes.root}>
            <LeftDrawer {...detalles}/>
            <Grid container spacing={8} className={classes.content}>
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
                <Grid item lg={4}>
                </Grid>
                <Grid item lg={12}>
                    <div className={classes.contenedor}>
                        <iframe className={classes.iframe} ref={this.iframe} src="/dist/iframe.html"></iframe>
                    </div>
                </Grid>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={appState.modalIsOpen}
                    onClose={this.handleCloseComponent}
                >
                    <div className={classes.components}>
                        <div className={classes.modalHeader}>
                            <Typography component="h3" variant="h3" color="primary">
                                { appState.componentName }
                            </Typography>
                            <IconButton color="primary" onClick={this.handleCloseComponent}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className={classes.modalBody}>
                        { appState.componentName === 'Variables' && <Variables {...detalles}/> }
                        </div>
                        <div>

                        </div>
                    </div>
                </Modal>
            </Grid>
            </main>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: '90px 30px 30px 30px',
        minWidth: 0, // So the Typography noWrap works
    },
    components: {
        position: 'absolute',
        top: 60,
        left: 60,
        right: 60,
        bottom: 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
    modalHeader: {
        height: '80px',
        color: '#000000',
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid indigo'
    },
    modalBody: {
        padding: 20,
    },
    contenedor: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iframe: {
        border: '2px solid black'
    }
});

const mapDispatchToProps = (dispatch) => ({
    startOpenCloseModal: () => dispatch(startOpenCloseModal())
});

const mapStateToProps = (state) => ({
    ejercicios: state.ejercicios,
    variables: state.variables,
    versiones: state.versiones,
    appState: state.appState,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Ejercicio);