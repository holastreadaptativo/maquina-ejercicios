import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ViewListIcon from '@material-ui/icons/ViewList';
import FunctionsIcon from '@material-ui/icons/Functions';
import SortIcon from '@material-ui/icons/Sort';
import CodeIcon from '@material-ui/icons/Code';

import SwipeableViews from 'react-swipeable-views';

import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import Funciones from './tabmenu/Funciones';
import Variables from './tabmenu/Variables';
import Versiones from './tabmenu/Versiones';
import Seleccion from './tabmenu/Seleccion';

const drawerWidth = 300;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    rootTabs: {
        maxWidth: 300
    },
    modifier: {
        minWidth: 75
    }
});

class LeftDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabDrawer: 0
        }
    }

    handleChangeDrawer = (event, value) => {
        this.setState({ tabDrawer: value });
    }

    handleChangeIndex = index => {
        this.setState({ tabDrawer: index });
    }

    render () {
        const { classes, theme, variables, versiones, ver, eje, version } = this.props;
        const { tabDrawer } = this.state;
        return (
            <Drawer
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <AppBar position="static" color="default" className={classes.rootTabs}>
                    <Tabs 
                        value={tabDrawer}
                        onChange={this.handleChangeDrawer}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab icon={<FunctionsIcon />} className={classes.modifier}/>
                        <Tab icon={<SortIcon/>} className={classes.modifier}/>
                        <Tab icon={<CodeIcon/>} className={classes.modifier}/>
                        <Tab icon={<ViewListIcon/>} className={classes.modifier}/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse': 'x'}
                    index={tabDrawer}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <Funciones />
                    <Seleccion />
                    <Versiones eje={eje} ver={ver} versiones={versiones} variables={variables}/>
                    <Variables version={version}/>
                </SwipeableViews>
            </Drawer>
        );
    }
}

export default compose(
  withStyles(styles, { withTheme: true })
)(LeftDrawer);