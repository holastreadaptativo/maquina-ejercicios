import React from 'react';
import _ from 'lodash';
import {
    Grid,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import AgregaEditaVariable from './AgregaEditaVariable';
import { 
    startAddVariable, 
    startRemoveVariable, 
    startEditVariable 
} from '../../actions/variables';

class Variables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: '',
            item: {}
        }
    }

    handleEdit = (item) => {
        this.setState(() => ({ action: 'Edit', item }));
    }

    handleDelete = (idVariable) => {
        const idEjercicio = this.props.eje;
        this.props.startRemoveVariable(idEjercicio, idVariable);
    }

    handleAdd = () => {
        this.setState(() => ({ action: 'Add', item: {} }));
    }

    handleCancel = () => {
        this.setState(() => ({ action: '', item: {} }));
    }

    handleStartAdd = (variable) => {
        const idEjercicio = this.props.eje;
        this.props.startAddVariable(idEjercicio,variable);
        this.setState(() => ({ action: '' }));
    }

    handleStartEdit = (idVariable, updates) => {
        const idEjercicio = this.props.eje;
        this.props.startEditVariable(idEjercicio, idVariable, updates);
        this.setState(() => ({ action: '' }));
    }

    render() {
        const { variables, version, eje } = this.props;
        const { item, action } = this.state;
        var numeroSiguiente = variables ? variables.length + 1 : 1; 
        return (
            <Grid container> 
                <Grid item lg={12} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Variable</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Restriccion</TableCell>
                                <TableCell>VT</TableCell>
                                <TableCell>Editar</TableCell>
                                <TableCell>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variables && variables.map((value, index) => {
                                if(action === 'Edit' && item.id === value.id) {
                                    return ( 
                                        <AgregaEditaVariable 
                                            key={index+1} 
                                            index={index+1} 
                                            {...value} 
                                            action={action} 
                                            version={version} 
                                            variables={variables}
                                            handleCancel={this.handleCancel}
                                            handleStartEdit={this.handleStartEdit}
                                        /> 
                                    );
                                } else {
                                    return (
                                        <TableRow key={index+1}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{value.nombre}</TableCell>
                                            <TableCell>{String(value.tipo).toUpperCase()}</TableCell>
                                            <TableCell>{value.valor}</TableCell>
                                            <TableCell>{value.restriccion}</TableCell>
                                            <TableCell>{value.vt}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => this.handleEdit(value)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => this.handleDelete(value.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                            { 
                                action === 'Add' && 
                                    <AgregaEditaVariable 
                                        index={numeroSiguiente} 
                                        action={action}
                                        version={version}
                                        variables={variables}
                                        handleCancel={this.handleCancel}
                                        handleStartAdd={this.handleStartAdd}
                                    /> 
                            }
                        </TableBody>
                    </Table>
                    { 
                        !action && <Button color="primary" onClick={ this.handleAdd }>Agregar</Button>
                    }
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddVariable: (idEjercicio, variable) => dispatch(startAddVariable(idEjercicio, variable)),
    startRemoveVariable: (idEjercicio, idVariable) => dispatch(startRemoveVariable(idEjercicio, idVariable)),
    startEditVariable: (idEjercicio, idVariable, updates) => dispatch(startEditVariable(idEjercicio, idVariable, updates))
});

export default connect(undefined, mapDispatchToProps)(Variables);