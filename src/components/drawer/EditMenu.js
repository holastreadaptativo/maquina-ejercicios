import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Tabs,
    Tab,
    ListSubheader
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import ViewListIcon from '@material-ui/icons/ViewList';
import FunctionsIcon from '@material-ui/icons/Functions';
import SortIcon from '@material-ui/icons/Sort';
import CodeIcon from '@material-ui/icons/Code';

import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

import Funciones from './tabmenu/Funciones';
import Variables from './tabmenu/Variables';

const styles = theme => ({
    rootTabs: {
        maxWidth: 300
    },
    modifier: {
        minWidth: 75
    }
});

const TabContainer = ({ children, dir }) => (
    <div dir={dir}>
        {children}
    </div>
);

class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    handleChangeIndex = index => {
        this.setState({ value: index });
    }
  
    render() {
        const { classes, theme } = this.props;
        return (
            <div>
                <AppBar position="static" color="default" className={classes.rootTabs}>
                    <Tabs 
                        value={this.state.value}
                        onChange={this.handleChange}
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
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <Funciones />
                    <TabContainer dir={theme.direction}>
                        <List>
                            <ListSubheader color="primary">Seleccion</ListSubheader>
                        </List>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <List>
                            <ListSubheader color="primary">Versiones</ListSubheader>
                        </List>
                    </TabContainer>
                    <Variables />
                </SwipeableViews>
            </div>
        );
    }
}
 
export default compose(
    withStyles(styles, { withTheme: true })
)(EditMenu);