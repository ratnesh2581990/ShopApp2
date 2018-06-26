import React, { Component } from 'react';
import { createDrawerNavigator } from "react-navigation";

import { SettingScreen, MainScreen } from './AppInnerScreens';

class AppDrawer extends Component {
    render() {
        return(
            <AppDrawerMenu />
        );
    }
}
const AppDrawerMenu = new createDrawerNavigator({
    MainScreen: {
        screen: MainScreen,
    },
    SettingScreen: {
        screen: SettingScreen,
    },
});
export { AppDrawer };