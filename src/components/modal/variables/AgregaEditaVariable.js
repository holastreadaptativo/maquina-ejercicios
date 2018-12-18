import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';
import pick from 'lodash/pick';

import { regexVariables, numeroEnPalabras } from '../../../actions/funciones';

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
            nombreError: '',
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

    handleGuardar = (e) => {
        const { nombre, tipo, valor, restriccion, vt } = this.state;
        try {
            if(restriccion) {
                var obj = {};
                obj[nombre] = vt;
                var restriccionReemplazado = regexVariables(restriccion, { ...obj, ...this.props.version });
                if(restriccionReemplazado.lenght > 0 && !eval(restriccionReemplazado)) {
                    throw new Error("Esto es falso "+ eval(restriccionReemplazado));
                }
            }
            if(nombre.lenght === 1) {
                throw new Error('Variable sin numbre');
            }
        } catch(e) {
            console.log(e);
            this.setState(() => ({ nombreError: 'Restriccion mal ingresada' }));
            return;
        }
        switch(tipo) {
            case 'funcion':
                try {
                    let funcion = regexVariables(valor, this.props.version);
                    if(String(funcion).indexOf('numeroEnPalabras') >= 0) {
                        console.log(numeroEnPalabras(funcion.match(/\d{1,}/g)[0]));
                    } else {
                        console.log(funcion);
                        eval(funcion);
                        console.log(eval(funcion));
                    }
                } catch(e) {
                    this.setState(() => ({ valorError: 'Valor mal ingresado' }));
                    console.log(e);
                    return;
                }   
                break;
            case 'numero':
            /*opciones soportadas:  arreglo => 0, 5, 8, 16, 48 || rango => 1...10 || constante => 10*/
                var isArreglo =  String(valor).match(/(\d{1,}(,)?){1,}/g);
                var isRango = String(valor).match(/\d{1,}\.\.\.\d{1,}/g);
                var isConstante = !isNaN(Number(valor));
                isArreglo = isArreglo ? isArreglo.length === 1 : false;
                isRango = isRango ? isRango.length === 1 : false;
                console.log(isArreglo, isRango, isConstante);
                if(!(isArreglo || isRango || isConstante)) {
                    this.setState(() => ({ valorError: 'Valor mal ingresado' }));
                    return;
                }
                break;
            default:
                break;
        }
        if(!(vt.length > 0)) {
            this.setState(() => ({ vtError: 'VT mal ingresada' }));
            return;
        }
        let variable = pick(this.state, ['nombre', 'tipo', 'valor', 'restriccion', 'vt']);
        if(this.state.id) {// si tiene el id de la variable esta editando
            this.props.handleStartEdit(this.state.id, variable);
        } else {
            this.props.handleStartAdd(variable);
        }
            
            
    }

    render() {
        const { numero, nombre, tipo, valor, restriccion, vt, nombreError, valorError, vtError, restriccionError } = this.state;
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
                        { nombreError && <FormHelperText>{nombreError}</FormHelperText> }
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
                    <Button color="primary" onClick={this.handleGuardar}>Guardar</Button>
                </TableCell>
                <TableCell>
                    <Button color="primary" onClick={ this.handleCancel }>Cancelar</Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(AgregaEditaVariable);