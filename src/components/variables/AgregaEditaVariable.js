import React from 'react';
import {
    TableRow,
    TableCell,
    Button,
    Input,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText,
    Select,
    withStyles
} from '@material-ui/core';
import _ from 'lodash';
import { regexVariables } from '../../actions/funciones';

const styles = theme => ({
    formControl: {
        width: 100
    }
});

class AgregaEditaVariable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numero: this.props.index,
            id: this.props.id ? this.props.id : undefined,
            nombre: this.props.action === 'Edit' ? this.props.nombre : '',
            tipo: this.props.action === 'Edit' ? this.props.tipo : '',
            valor: this.props.action === 'Edit' ? this.props.valor : '',
            restriccion: this.props.action === 'Edit' ? this.props.restriccion : '',
            vt: this.props.action === 'Edit' ? this.props.vt : '',
            restriccionError : '',
            valorError: '',
            vtError: ''
        }
    }

    handleCancel = () => {
        this.props.handleCancel();
    }

    handleChangeTipo = (e) => {
        const tipo = e.target.value;
        this.setState(() => ({ tipo }));
    }

    handleChangeNombre = (e) => {
        const nombre = e.target.value;
        var estaRepetida = this.props.variables ? 
            this.props.variables.find((variable) => variable.nombre === nombre) : false;
        if(nombre.match(/^\w{0,1}$/g) && !estaRepetida) {
            this.setState(() => ({ nombre }));
        }
    }

    handleChangeValor = (e) => {
        const valor = e.target.value;
        this.setState(() => ({ valor, valorError: '' }));
    }

    handleChangeRestriccion = (e) => {
        const restriccion = e.target.value;
        this.setState(() => ({ restriccion, restriccionError: '' }));
    }

    handleChangeVt = (e) => {
        const vt = e.target.value;
        this.setState(() => ({ vt, vtError: '' }));
    }

    handleAdd = (e) => {
        const { nombre, tipo, valor, restriccion, vt } = this.state;
        try {
            if(restriccion) {
                var obj = {};
                obj[nombre] = vt;
                var restriccionReemplazado = regexVariables(restriccion, { ...obj, ...this.props.version });
                eval(restriccionReemplazado);
            }
        } catch(e) {
            this.setState(() => ({ restriccionError: 'Restriccion mal ingresada' }));
            return;
        }
        switch(tipo) {
            case 'funcion':
                try {
                    eval(regexVariables(valor, this.props.version));
                } catch(e) {
                    this.setState(() => ({ valorError: 'Valor mal ingresado' }));
                }   
                break;
            case 'numero':
            /*opciones soportadas:  arreglo => 0, 5, 8, 16, 48 || rango => 1...10 || constante => 10*/
                var isArreglo =  String(valor).split(',').length > 0;
                var isRango = String(valor).indexOf('...') > 0 && String(valor).split('...').length === 2;
                var isConstante = !isNaN(Number(valor));
                if(!(isArreglo || isRango || isConstante)) {
                    this.setState(() => ({ valorError: 'Valor mal ingresado' }));
                    return;
                }
                break;
            default:
                break;
        }
        if(!Number.isInteger(parseInt(vt))) {
            this.setState(() => ({ vtError: 'VT mal ingresada' }));
            return;
        }
        let variable;
        if(this.state.restriccion) {
            variable = _.pick(this.state, ['nombre', 'tipo', 'valor', 'restriccion', 'vt']);
        } else {
            variable = _.pick(this.state, ['nombre', 'tipo', 'valor', 'vt']);
        }
        this.props.handleStartAdd(variable);
    }

    handleEdit = (e) => {
        const { nombre, tipo, valor, restriccion, vt } = this.state;
        try {
            var obj = {};
            obj[nombre] = vt;
            var restriccionReemplazado = regexVariables(restriccion, { ...obj, ...this.props.version });
            eval(restriccionReemplazado);
        } catch(e) {
            this.setState(() => ({ restriccionError: 'Restriccion mal ingresada' }));
            return;
        }
        switch(tipo) {
            case 'funcion':
                try {
                    eval(regexVariables(valor, this.props.version));
                } catch(e) {
                    this.setState(() => ({ valorError: 'Valor mal ingresado' }));
                }   
                break;
            case 'numero':
            /*opciones soportadas:  arreglo => [0, 5, 8, 16, 48] || rango => 1...10 || constante => 10*/
                var isArreglo =  String(valor).startsWith('[') && String(valor).endsWith(']') && String(valor).split(',').length > 0;
                var isRango = String(valor).indexOf('...') > 0 && String(valor).split('...').length === 2;
                var isConstante = !isNaN(Number(valor));
                if(!(isArreglo || isRango || isConstante)) {
                    this.setState(() => ({ valorError: 'Valor mal ingresado' }));
                    return;
                }
                break;
            default:
                break;
        }
        if(!Number.isInteger(parseInt(vt))) {
            this.setState(() => ({ vtError: 'VT mal ingresada' }));
            return;
        }
        let updates;
        if(this.state.restriccion) {
            updates = _.pick(this.state, ['nombre', 'tipo', 'valor', 'restriccion', 'vt']);
        } else {
            updates = _.pick(this.state, ['nombre', 'tipo', 'valor', 'vt']);
        }
        this.props.handleStartEdit(this.state.id, updates);
    }

    render() {
        const { numero, nombre, tipo, valor, restriccion, vt, valorError, vtError, restriccionError } = this.state;
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell>{numero}</TableCell>
                <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="txtNombre">Nombre</InputLabel>
                        <Input 
                            inputProps={{id : "txtNombre"}}
                            value={nombre}
                            onChange={this.handleChangeNombre}
                        />
                    </FormControl>
                </TableCell>
                <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="cbxTipo">Tipo</InputLabel>
                        <Select value={tipo} onChange={this.handleChangeTipo} inputProps={{ id: "cbxTipo" }}>
                            <MenuItem value="funcion">Funcion</MenuItem>
                            <MenuItem value="numero">Numero</MenuItem>
                            <MenuItem value="texto">Texto</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="txtValor">Valor</InputLabel>
                        <Input 
                            inputProps={{id : "txtValor"}}
                            value={valor}
                            onChange={this.handleChangeValor}
                        />
                        { valorError && <FormHelperText>{valorError}</FormHelperText> }
                    </FormControl>
                </TableCell>
                <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="txtRestriccion">Restriccion</InputLabel>
                        <Input 
                            inputProps={{id : "txtRestriccion"}}
                            value={restriccion}
                            onChange={this.handleChangeRestriccion}
                        />
                        { restriccionError && <FormHelperText color="error">{restriccionError}</FormHelperText> }
                    </FormControl>
                </TableCell>
                <TableCell>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="txtVt">VT</InputLabel>
                        <Input 
                            inputProps={{id : "txtVt"}}
                            autoFocus
                            value={vt}
                            onChange={this.handleChangeVt}
                        />
                        { vtError && <FormHelperText>{vtError}</FormHelperText> }
                    </FormControl>
                </TableCell>
                <TableCell>
                    {
                        this.props.action === 'Edit' ?
                            (<Button color="primary" onClick={this.handleEdit}>Editar</Button>) :
                            (<Button color="primary" onClick={this.handleAdd}>Agregar</Button>)
                    }
                </TableCell>
                <TableCell>
                    <Button color="primary" onClick={ this.handleCancel }>Cancelar</Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(AgregaEditaVariable);