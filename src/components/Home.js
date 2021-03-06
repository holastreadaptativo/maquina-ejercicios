import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import { startAddEjercicio, startDeleteEjercicio } from '../actions/ejercicios'

const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: '90px 30px 30px 30px',
        minWidth: 0, // So the Typography noWrap works
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accion: undefined,
            id: '',
            descripcion: ''
        };
    }

    handleAdd = () => {
        this.setState(() => ({ accion: 'add' }));
    }

    handleStartsAdd = () => {
        const { id, descripcion } = this.state;
        this.props.startAddEjercicio(id, descripcion);
        this.setState(() => ({ accion: undefined, id: '', descripcion: '' }));
    }

    handleStartDelete = (id) => {
        this.props.startDeleteEjercicio(id);
    }

    hanldeChangeId = (e) => {
        const id = e.target.value;
        if(String(id).match(/^\d{0,15}$/g)) {
            this.setState(() => ({ id }));
        }
    }

    handleChangeDescripcion = (e) => {
        const descripcion = e.target.value;
        if(String(descripcion).length <= 100) {
            this.setState(() => ({ descripcion }));
        }
    }

    handleCancel = (e) => {
        this.setState(() => ({ accion: undefined }));
    }

    render() {
        const { accion, id, descripcion } = this.state;
        const { ejercicios, classes } = this.props;
        return(
            <Grid container className={classes.content}>
                <Grid item lg={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell>Opciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { 
                                ejercicios.length > 0 ? ejercicios.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Link to={`/ejercicio/${item.id}/vt`}>{item.id}</Link></TableCell>
                                        <TableCell>{item.descripcion}</TableCell>
                                        <TableCell><Button onClick={() => this.handleStartDelete(item.id)}>Eliminar</Button></TableCell>
                                    </TableRow>
                                )) :
                                <TableRow>
                                    <TableCell colSpan={3}>Sin datos</TableCell>
                                </TableRow>
                            }
                            {accion === 'add' && (
                                <TableRow>
                                    <TableCell>
                                        <FormControl>
                                            <InputLabel htmlFor="txtId">ID</InputLabel>
                                            <Input 
                                                inputProps={{id : "txtId"}}
                                                value={id}
                                                onChange={this.hanldeChangeId}
                                            />
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <FormControl>
                                            <InputLabel htmlFor="txtDescripcion">Descripcion</InputLabel>
                                            <Input 
                                                inputProps={{id : "txtDescripcion"}}
                                                value={descripcion}
                                                onChange={this.handleChangeDescripcion}
                                            />
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="primary" onClick={this.handleStartsAdd}>Agregar</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {this.state.accion !== 'add' ?
                        <Button color="primary" onClick={this.handleAdd}>Agregar</Button> :
                        <Button color="primary" onClick={this.handleCancel}>Cancelar</Button>
                    }
                </Grid>
            </Grid>
        );
    }

}

const mapStateToProps = (state) => ({
    ejercicios: state.ejercicios
});

const mapDispatchToProps = (dispatch) => ({
    startAddEjercicio: (id, descripcion) => dispatch(startAddEjercicio(id, descripcion)),
    startDeleteEjercicio: (id) => dispatch(startDeleteEjercicio(id))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Home);