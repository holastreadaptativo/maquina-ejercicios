import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import { startOpenCloseModal } from '../../../actions/appstate';
import { startGenerarVersiones, startUpdateVersion } from '../../../actions/versiones';

const styles = {
    txtCantidadVersiones: {
        width: '40px',
        border: '1px solid black'
    }
}

class Versiones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cantidadVersiones: this.props.versiones.length
        }
    }

    handleOpenModalEditarVersion = () => {
        this.props.startOpenCloseModal('Editar Version');
    }

    handleCreateVersions = () => {
        const { variables, eje } = this.props;
        const { cantidadVersiones } = this.state;
        this.props.startGenerarVersiones(eje, variables, cantidadVersiones);
    }

    handleUpdateVersion = () => {
        const { eje, ver, variables } = this.props;
        this.props.startUpdateVersion(eje, ver, variables);
    }

    handleChangeCantidadVersiones = (e) => {
        const cantidadVersiones = Number(e.target.value);
        if(!isNaN(cantidadVersiones)) {
            this.setState(() => ({ cantidadVersiones }));
        }
    }

    render() {
        const { classes, theme, versiones, eje, ver } = this.props;
        const { cantidadVersiones } = this.state;
        return(
            <div dir={theme.direction}>
                <List component="div" disablePadding dense>
                    <ListSubheader color="primary">Versiones</ListSubheader>
                    {
                        ver === 'vt' &&
                        <ListItem color="primary">
                            <ListItemText primary="Generar Versiones" />
                            <input 
                                type="text" 
                                id="txtCantidad" 
                                className={classes.txtCantidadVersiones} 
                                value={cantidadVersiones} 
                                onChange={this.handleChangeCantidadVersiones}
                            />
                            <IconButton aria-label="Generar" onClick={this.handleCreateVersions}>
                                <SendIcon />
                            </IconButton>
                        </ListItem> 
                    }
                    <Divider />
                    {
                        ver === 'vt' ? 
                        <ListItem dense selected={true}>
                            <ListItemText primary="VT" />
                        </ListItem> : 
                        <ListItem button component={Link} to={`/ejercicio/${eje}/vt`}>
                            <ListItemText primary="VT"/>
                        </ListItem>
                    }
                    {
                        versiones.length > 0 ? versiones.map((version) => {
                            return ver === version.id ? 
                            <ListItem dense key={version.id} selected={true}>
                                <ListItemText primary={version.id}/>
                                {
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Delete" onClick={this.handleUpdateVersion}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                }
                            </ListItem>  :
                            <ListItem key={version.id} button component={Link} to={`/ejercicio/${eje}/${version.id}`}>
                                <ListItemText primary={version.id} />
                            </ListItem>
                        }) :
                        <ListItem>
                            <ListItemText primary="Sin versiones"/>
                        </ListItem>
                    }
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    appState: state.appState
});

const mapDispatchToProps = (dispatch) => ({
    startOpenCloseModal: (component) => dispatch(startOpenCloseModal(component)),
    startGenerarVersiones: (idEjercicio, variables, numeroVersiones) => dispatch(startGenerarVersiones(idEjercicio, variables, numeroVersiones)),
    startUpdateVersion: (idEjercicio, idVersion, variables) => dispatch(startUpdateVersion(idEjercicio, idVersion, variables))
});

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(Versiones);