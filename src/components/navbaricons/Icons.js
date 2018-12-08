import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DirecctionsRun from '@material-ui/icons/DirectionsRun';
import HomeIncon from '@material-ui/icons/Home';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { startLogout } from '../../actions/auth'

class IconsAppBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogOut = () => {
    this.props.startLogout();
  };

  render() {
    return (
      <div>
        <IconButton component={Link} to="/home" color="inherit" aria-label="Inicio" title="Inicio">
          <HomeIncon />
        </IconButton>
        <IconButton component={Link} to="/cuentas" color="inherit" aria-label="Cuentas" title="Cuentas">
          <AccountCircleRoundedIcon />
        </IconButton>
        <IconButton onClick={this.handleLogOut} color="inherit" aria-label="Salir" title="Salir">
          <DirecctionsRun />
        </IconButton>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default compose(
  connect(undefined, mapDispatchToProps)
)(IconsAppBar);

