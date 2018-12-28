import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';

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

    handleOpenModal = (modal) => {
        this.props.startOpenCloseModal(modal);
    }

    render() {
        const { theme } = this.props;
        return (
            <div dir={theme.direction}>
                <List component="nav">
                    <ListSubheader color="primary">Funciones</ListSubheader>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemText primary="General" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto">
                        <List component="div" disablePadding dense>
                            <ListItem button onClick={() => this.handleOpenModal('Agregar Texto')}>
                                <ListItemText primary="Agregar Texto" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemText primary="Numeros y operaciones" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Patrones y álgebra" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Geometría" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText color="primary" primary="Medición" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText color="primary" primary="Datos y probabilidades" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startOpenCloseModal: (component) => dispatch(startOpenCloseModal(component))
});

export default compose(
    withTheme(),
    connect(undefined, mapDispatchToProps)
)(Funciones);

