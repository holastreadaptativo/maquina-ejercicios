import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';
import _ from 'lodash';

import { IgualPerimetroRenderString } from './DibujaIgualPerimetro';
import Preview from '../Preview';

const styles = theme => ({
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
    formControl: {
        width: '100%',
        marginBottom: 10
    }
});

class EditaTransportador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            lado: this.props.lado ? this.props.lado : 40,
            color: this.props.color ? this.props.color: '#9900EF',
            alto: this.props.alto ? this.props.alto: 'a',
            ancho: this.props.ancho ? this.props.ancho : 'b',
            version: this.props.version
        };
    }

    handleChangeColor = (color, event) => {
        this.setState(() => ({ color: color.hex }));
    }

    handleChangeLado = (e) => {
        const lado = _.toNumber(e.target.value);
        this.setState(() => ({ lado }));
    }

    handleChangeAlto = (e) => {
        const alto = e.target.value;
        this.setState(() => ({ alto }));
    }

    handleChangeAncho = (e) => {
        const ancho = e.target.value;
        this.setState(() => ({ ancho }));
    }

    handleClick = () => {
        this.setState(() => ({ displayColorPicker: !this.state.displayColorPicker }))
    };
    
    handleClose = () => {
        this.setState(() => ({ displayColorPicker: false }))
    };

    render() {
        const { classes } = this.props;
        const { lado, color, alto, ancho, version } = this.state;
        var props = _.pick(this.state, ['lado', 'color', 'alto', 'ancho', 'version']);
        const html = IgualPerimetroRenderString(props);
        var menuItems = Object.keys(version).map((key, index) => {
            return <MenuItem key={index} value={key}>{`${key} [${version[key]}]`}</MenuItem>
        });
        return (
            <Grid container spacing={16}>
                <Grid item lg={2}>
                    <Grid item lg={12}>
                        <h1>Transportador</h1>
                    </Grid>
                    <Grid item lg={12}>
                        <FormControl className={ classes.formControl }>
                            <InputLabel htmlFor="txtLado">Lado</InputLabel>
                            <Input 
                                inputProps={{ id: 'txtLado' }}
                                value={lado}
                                onChange={this.handleChangeLado}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item lg={12}>
                        <FormControl className={ classes.formControl }>
                            <InputLabel htmlFor="txtColor">Color Reactangulo</InputLabel>
                            <Input 
                                inputProps={{ id: 'txtColor' }}
                                value={ color }
                                disabled
                                style={{backgroundColor: this.state.color, cursor: 'pointer'}}
                                onClick={ this.handleClick }
                            />
                            { 
                                this.state.displayColorPicker ? 
                                    <div className={ classes.popover }> 
                                        <div className={ classes.cover } onClick={ this.handleClose }/>
                                        <SketchPicker color={ this.state.color } onChange={ this.handleChangeColor } />
                                    </div> : 
                                    null 
                            }
                        </FormControl>
                    </Grid>
                    <Grid item lg={12}>
                        <FormControl className={ classes.formControl }>
                            <InputLabel htmlFor="cbxAlto">Alto</InputLabel>
                            <Select value={alto} onChange={this.handleChangeAlto} inputProps={{ id: "cbxAlto" }}>
                                {menuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={12}>
                        <FormControl className={ classes.formControl }>
                            <InputLabel htmlFor="cbxAncho">Ancho</InputLabel>
                            <Select value={ancho} onChange={this.handleChangeAncho} inputProps={{ id: "cbxAncho" }}>
                                {menuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item lg={10}>
                    <Preview html={html}/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(EditaTransportador);