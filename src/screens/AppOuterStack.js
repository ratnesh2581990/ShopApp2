import React, { Component } from 'react';
import { createStackNavigator,  } from "react-navigation";

import { Login } from './Login';
import { Signup } from './Signup';
import { ForgetPassword } from './ForgetPassword';
import { LoginReg } from './LoginReg';
import { Splash } from './Splash';
import { AppDrawer } from "./AppDrawer";

class AppOuterStack extends Component {
    render() {
        return(
            <AppOuterStackMenu />
        );
    }
}
const AppOuterStackMenu = new createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null
        }
    },
    LoginReg: {
        screen: LoginReg,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Login"
        }
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            title: "Register"
        }
    },
    ForgetPassword: {
        screen: ForgetPassword,
    },
    AppDrawer: {
        screen: AppDrawer,
        navigationOptions: {
            header: null
        }
    },
});
export { AppOuterStack };