import React from 'react';
import {
    Avatar,
    Grid,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Input,
    Button
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';

import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { startLoginWithEmailAndPassword } from '../actions/auth';
import { startLoginWithGoogle } from '../actions/auth';

const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: '90px 30px 30px 30px',
        minWidth: 0, // So the Typography noWrap works
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});
  

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.startLoginWithEmailAndPassword(email, password);
        this.props.history.push('/home');
    };

    handleLoginWithGoogle = (e) => {
        e.preventDefault();
        this.props.startLoginWithGoogle();
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify={"center"} className={classes.content}>
                <Grid item sm={12} md={8} lg={3}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="h4">Iniciar Sesion</Typography>
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Correo</InputLabel>
                                <Input 
                                    id="email" 
                                    name="email" 
                                    autoFocus
                                    onChange={this.handleEmailChange}
                                    value={this.state.email}  
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Constraseña</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    onChange={this.handlePasswordChange}
                                    value={this.state.password}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                color="primary"
                                className={classes.submit}
                            >
                                Ingresar
                            </Button>
                        </form>
                        <Button
                            type="button"
                            fullWidth
                            color="secondary"
                            className={classes.submit}
                            onClick={this.handleLoginWithGoogle}
                        >
                            Iniciar Sesion con Google
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    startLoginWithEmailAndPassword: (email, password) => dispatch(startLoginWithEmailAndPassword(email, password)),
    startLoginWithGoogle: () => dispatch(startLoginWithGoogle())
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Login);