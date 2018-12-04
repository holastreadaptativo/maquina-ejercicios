import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListSubheader,
} from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core';
import compose from 'recompose/compose';

import { startOpenCloseModal } from '../../../actions/appstate';

class Funciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 0
        };
    }

    handleClick = () => {
        this.setState((state) => ({ open: !state.open }));
    }

    handleOpenModalPerimetro = (event) => {
        this.props.startOpenCloseModal('Igual Perimetro');
    }

    render() {
        const { theme } = this.props;
        return (
            <div dir={theme.direction}>
                <List component="nav">
                    <ListSubheader color="primary">Funciones</ListSubheader>
                    <ListItem color="primary" button onClick={this.handleClick}>
                        <ListItemText primary="Numeros y operaciones" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto">
                        <List component="div" disablePadding dense>
                            <ListItem button onClick={this.handleOpenModalPerimetro}>
                                <ListItemText primary="Igual Perimetro" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button >
                        <ListItemText color="primary" primary="Patrones y álgebra" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText color="primary" primary="Geometría" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText color="primary" primary="Medición" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText color="primary" primary="Datos y probabilidades" />
                    </ListItem>
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
)(Funciones);

