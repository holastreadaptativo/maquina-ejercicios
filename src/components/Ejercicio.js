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
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

import LeftDrawer from './drawer/LeftDrawer';
import { startOpenCloseModal } from '../actions/appstate';
//componentes
import Variables from './modal/variables/Variables';
import AgregarTexto from './modal/texto/AgregarTexto';

class Ejercicio extends React.Component {
    constructor(props) {
        super(props);
        this.iframe = React.createRef();
        this.state = {
            tabPlataforma: 2,
            tabDrawer: 0
        }
    }

    handleCloseComponent = () => {
        this.props.startOpenCloseModal();
    }

    handleChangePlatform = (event, value) => {
        this.setState({ tabPlataforma: value });
    }

    getDetails = () => {
        const { eje, ver } = this.props.match.params;
        const variables = this.props.variables[eje];
        const versiones = this.props.versiones[eje];
        const enunciados = this.props.enunciados[eje];
        var version;
        if(versiones && ver !== 'vt') {
            version = versiones.find(item => item.id === ver);
        } else if(variables && ver === 'vt') {
            version = {
                id: 'vt'
            };
            for(let variable of variables) {
                version[variable.nombre] = variable.vt;
            }
        }
        return { eje, ver, variables, version, versiones, enunciados };
    }

    componentDidMount() {
        this.handleIFrame();
    }

    componentDidUpdate() {
        this.handleIFrame();
    }

    handleIFrame = () => {
        switch(this.state.tabPlataforma) {
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
        const { eje, ver } = this.props.match.params;
        const detalles = this.getDetails()
        return (
            <main className={classes.root}>
            <LeftDrawer {...detalles}/>
            <Grid container spacing={8} className={classes.content}>
                <Grid item xs={12} md={8} xl={4}>
                    <Paper square>
                        <Tabs
                            value={this.state.tabPlataforma}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={this.handleChangePlatform}
                            fullWidth
                        >
                            <Tab icon={<MobileScreenShareIcon/>} />
                            <Tab icon={<TabletAndroidIcon/>} />
                            <Tab icon={<DesktopWindowsIcon/>} />
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <div className={classes.contenedor}>
                        <iframe className={classes.iframe} ref={this.iframe} src={`http://localhost:5001/maquina-dev/us-central1/app/api/ejercicio/${eje}/${ver}`}></iframe>
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
                            <Typography variant="h2" gutterBottom>
                                { appState.componentName }
                            </Typography>
                            <IconButton color="primary" onClick={this.handleCloseComponent}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <div className={classes.modalBody}>
                        { appState.componentName === 'Variables' && <Variables {...detalles}/> }
                        { appState.componentName === 'Agregar Texto' && <AgregarTexto {...detalles}/> }
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
        maxHeight: 'calc(100% - 120px)',
        overflowY: 'scroll'
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
    enunciados: state.enunciados
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Ejercicio);