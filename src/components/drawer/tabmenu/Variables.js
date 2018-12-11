import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import Edit from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core';
import compose from 'recompose/compose';

import { startOpenCloseModal } from '../../../actions/appstate';

class Variables extends React.Component {
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
                    <ListSubheader color="primary">Variables</ListSubheader>
                    <ListItem color="primary" button onClick={ this.handleOpenModalVariables }>
                        <ListItemText primary="Editar" />
                        <Edit />
                    </ListItem>
                    <Divider />
                    {
                        variables.length > 0 ? variables.map(variable => (
                            <ListItem key={variable.id}>
                                <ListItemText color="primary" primary={`$${variable.nombre} [${variable.vt}]`}/>
                            </ListItem> 
                        )) :
                        <ListItem button >
                            <ListItemText color="primary" primary={``}/>
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
    startOpenCloseModal: (component) => dispatch(startOpenCloseModal(component))
});

export default compose(
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps)
)(Variables);