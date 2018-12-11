import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Home from '../components/Home';
import Ejercicio from '../components/Ejercicio'
import Cuentas from '../components/Cuentas'
import Login from '../components/Login';
import NotFoundPage from '../components/NotFoundPage';
import { startShowHideMessage } from '../actions/appstate';

import LeftDrawer from '../components/drawer/LeftDrawer'
import IconsAppBar from '../components/navbaricons/Icons';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    messages: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        boxShadow: theme.shadows[5],
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        outline: 'none',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
    },
    messageTitle: {
        display: 'flex',
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.background.primary,
    },
    messageBody: {
        padding: theme.spacing.unit * 2
    },
    messageAction: {
        backgroundColor: theme.palette.primary,
        padding: theme.spacing.unit * 2
    },
});

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDrawer: false
        }
    }

    handleHideMessage = () => {
        this.props.startShowHideMessage();
    }

    render() {
        const { classes, appState, isAuthenticated } = this.props;
        return (
            <Router history={history}>
                <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="absolute" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap className={classes.grow}>
                                Máquina de Ejercicios
                            </Typography>
                            { isAuthenticated && <IconsAppBar /> /* muestra iconos superior derecho*/} 
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <PublicRoute path="/" component={Login} exact={true} />
                        <PrivateRoute path="/home" component={Home} />
                        <PrivateRoute path="/ejercicio/:eje/:ver" component={Ejercicio} />
                        <PrivateRoute path="/cuentas" component={Cuentas} />
                        <Route component={NotFoundPage}/>
                    </Switch>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={appState.messageIsShowed}
                        onClose={this.handleHideMessage}
                    >
                        <div className={classes.messages}>
                            <div className={classes.messageTitle}>
                                <Typography component="h1">
                                    Error
                                </Typography>
                            </div>
                            <div className={classes.messageBody}>
                                <Typography component="p" >
                                    { appState.message }
                                </Typography>
                            </div>
                            <div className={classes.messageAction}>
                                <Button color="secondary" onClick={this.handleHideMessage}>
                                    Entendido
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
                </React.Fragment>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    appState: state.appState,
    isAuthenticated: Object.keys(state.user).length !== 0
});

const mapDispatchToProps = (dispatch) => ({
    startShowHideMessage: () => dispatch(startShowHideMessage())
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(AppRouter);


