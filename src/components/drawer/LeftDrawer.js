import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider
} from '@material-ui/core';

import EditMenu from './EditMenu';

const drawerWidth = 300;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
});

const LeftDrawer = (props) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: props.classes.drawerPaper,
    }}
  >
    <div className={props.classes.toolbar} />
    <List><EditMenu /></List>
  </Drawer>
);

export default withStyles(styles)(LeftDrawer);