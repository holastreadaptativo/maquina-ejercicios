import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ViewListIcon from '@material-ui/icons/ViewList';
import FunctionsIcon from '@material-ui/icons/Functions';
import SortIcon from '@material-ui/icons/Sort';
import CodeIcon from '@material-ui/icons/Code';

import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Funciones from './tabmenu/Funciones';
import Variables from './tabmenu/Variables';
import Versiones from './tabmenu/Versiones';
import Seleccion from './tabmenu/Seleccion';

import { changeTab } from '../../actions/appstate';

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
    }

    handleChangeDrawer = (event, value) => {
        this.props.changeTab(value);
    }

    render () {
        const { classes, tabIndex, variables, versiones, ver, eje, version, enunciados } = this.props;
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
                        value={tabIndex}
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
            { tabIndex === 0 && <Funciones /> }
            { tabIndex === 1 && <Seleccion eje={eje} enunciados={enunciados}/> }
            { tabIndex === 2 && <Versiones eje={eje} ver={ver} versiones={versiones} variables={variables}/> }
            { tabIndex === 3 && <Variables version={version}/> }        
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => ({
    tabIndex: state.appState.drawerIndex
});

const mapDispatchToProps = (dispatch) => ({
    changeTab: (drawerIndex) => dispatch(changeTab(drawerIndex))
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(LeftDrawer);