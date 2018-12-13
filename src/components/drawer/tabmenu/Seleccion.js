import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { withTheme } from '@material-ui/core';

class Seleccion extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOpenModalVariables = (event) => {
        this.props.startOpenCloseModal('Variables');
    }

    render() {
        const { theme, variables } = this.props;
        return (
            <div dir={theme.direction}>
                <List component="div" disablePadding dense>
                    <ListSubheader color="primary">Seleccion</ListSubheader>
                </List>
            </div>
        );
    }
}

export default withTheme()(Seleccion);