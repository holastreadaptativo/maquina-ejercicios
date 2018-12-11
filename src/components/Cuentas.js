import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: '90px 30px 30px 30px',
      minWidth: 0, // So the Typography noWrap works
  },
});

class Cuentas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <h1>Cuentas</h1>
      </div>
    );
  }
}

export default withStyles(styles)(Cuentas);