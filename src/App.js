import React, { Component } from 'react';
import { View , Text, StyleSheet } from 'react-native';
import { AppOuterStack } from './screens/AppOuterStack';
export default class App extends Component {
    render() {
        return(
            <AppOuterStack />
        );
    }
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    }
})