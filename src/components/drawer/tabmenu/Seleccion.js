import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { withTheme } from '@material-ui/core';

class Seleccion extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { theme, enunciados } = this.props;
        return (
            <div dir={theme.direction}>
                <List component="div" disablePadding dense>
                    <ListSubheader color="primary">Enunciado</ListSubheader>
                    {enunciados.map(enunciado => (
                        <ListItem key={enunciado.id}>
                            <ListItemText>{enunciado.name}-{enunciado.posicion}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default withTheme()(Seleccion);