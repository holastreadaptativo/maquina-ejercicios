import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'

import { orderBy } from 'lodash';

import withTheme from '@material-ui/core/styles/withTheme';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { startDeleteEnunciado } from '../../../actions/enunciados';

class Seleccion extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDeleteEnunciado = (idEjercicio, idEnunciado) => {
        this.props.startDeleteEnunciado(idEjercicio, idEnunciado);
    }

    render() {
        const { theme, enunciados, eje } = this.props;
        return (
            <div dir={theme.direction}>
                <List component="div" disablePadding dense>
                    <ListSubheader color="primary">Enunciado</ListSubheader>
                    {orderBy(enunciados, ['posicion'], ['asc']).map(enunciado => (
                        <ListItem key={enunciado.id}>
                            <ListItemText>{enunciado.name}-{enunciado.posicion}</ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete" onClick={() => this.handleDeleteEnunciado(eje, enunciado.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startDeleteEnunciado: (idEjercicio, idEnunciado) => dispatch(startDeleteEnunciado(idEjercicio, idEnunciado))
});

export default compose(
    withTheme(),
    connect(undefined, mapDispatchToProps)
)(Seleccion);