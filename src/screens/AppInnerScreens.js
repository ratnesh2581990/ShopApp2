import React from 'react';
import { View ,  } from 'react-native';
import { createStackNavigator } from "react-navigation";
import { Text, Button, Icon } from 'native-base';
import { Main } from './Main';
import { Setting } from './Setting';

const SettingScreen = new createStackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions : ({navigation}) =>{
            return {
                headerLeft: (
                    <View style={{ padding: 10 }} >
                        <Button transparent onPress={() => navigation.openDrawer()} >
                            <Icon style={{fontSize: 34,}} name="menu" />
                        </Button>
                    </View>
                )
            }
        }
    },
});
const MainScreen = new createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions : ({navigation}) =>{
            return {
                headerLeft: (
                    <View style={{ padding: 10 }} >
                        <Button transparent onPress={() => navigation.openDrawer()} >
                            <Icon style={{fontSize: 34,}} name="menu" />
                        </Button>
                    </View>
                )
            }
        }
    }
});
export { SettingScreen, MainScreen };