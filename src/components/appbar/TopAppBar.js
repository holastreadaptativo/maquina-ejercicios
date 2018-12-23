import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DirecctionsRun from '@material-ui/icons/DirectionsRun';
import HomeIncon from '@material-ui/icons/Home';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';

import { startLogout } from '../../actions/auth';


const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
});

class TopAppBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogOut = () => {
        this.props.startLogout();
    };

    render() {
        const { classes, isAuthenticated } = this.props;
        return (
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                        Máquina de Ejercicios
                    </Typography>
                    {
                        isAuthenticated && 
                        <IconButton component={Link} to="/home" color="inherit" aria-label="Inicio" title="Inicio">
                            <HomeIncon />
                        </IconButton>
                    }
                    {
                        isAuthenticated &&
                        <IconButton component={Link} to="/cuentas" color="inherit" aria-label="Cuentas" title="Cuentas">
                            <AccountCircleRoundedIcon />
                        </IconButton>
                    }
                    {
                        isAuthenticated &&
                        <IconButton onClick={this.handleLogOut} color="inherit" aria-label="Salir" title="Salir">
                            <DirecctionsRun />
                        </IconButton>
                    }
                    
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => ({
    appState: state.appState,
    isAuthenticated: Object.keys(state.user).length !== 0
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(TopAppBar);

