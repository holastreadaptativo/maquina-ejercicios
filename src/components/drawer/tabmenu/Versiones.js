import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core';
import compose from 'recompose/compose';

import { startOpenCloseModal } from '../../../actions/appstate';

class Versiones extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOpenModalAgregarVersion = () => {
        this.props.startOpenCloseModal('Agregar Version');
    }

    handleOpenModalEditarVersion = () => {
        this.props.startOpenCloseModal('Editar Version');
    }

    render() {
        const { theme } = this.props;
        return(
            <div dir={theme.direction}>
                <List component="div" disablePadding dense>
                    <ListSubheader color="primary">Versiones</ListSubheader>
                    <ListItem color="primary" button onClick={ this.handleOpenModalAgregarVersion }>
                        <ListItemText primary="Agregar" />
                        <Add />
                    </ListItem>
                    <ListItem color="primary" button onClick={ this.handleOpenModalEditarVersion }>
                        <ListItemText primary="Editar" />
                        <Edit />
                    </ListItem>
                    <Divider />
                    <ListItem color="primary">
                        <ListItemText primary="Generar Versiones" />
                    </ListItem>
                    <Divider />
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    appState: state.appState
});

const mapDispatchToProps = (dispatch) => ({
    startOpenCloseModal: (component) => dispatch(startOpenCloseModal(component))
});

export default compose(
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps)
)(Versiones);