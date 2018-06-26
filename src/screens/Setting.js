import React, { Component } from 'react';
import { View ,StyleSheet, AsyncStorage } from 'react-native';
import {
    Container, Content, Button, Text,
} from 'native-base';
import firebase from 'react-native-firebase';
import a,{ NavigationActions, StackActions } from 'react-navigation';


class Setting extends Component {
    
    signOut = ()=>{
        if(firebase.auth().user){
            firebase.auth().signOut().then(function() {
                console.log('Signed Out');
            }, function(error) {
                console.error('Sign Out Error', error);
            });
        }
        this.removeUser();
        

        // this.props.navigation.navigate("LoginReg");
        // console.log("to logreg", NavigationActions.NavigationActions);
        
        // AsyncStorage.removeItem("user").catch((error)=>{
        //     console.log("signOut err", error)
        // });
    }
    removeUser = ()=>{
        try {
            const value =  AsyncStorage.removeItem('user');
        } catch (error) {
            console.log("signOut err", error)
            // Error retrieving data
        }
    } 
    render() {
        return(
            <Container>
                <Content>
                    <Button block
                        onPress={()=> {
                            this.signOut();
                        }}
                    >
                    <Text>
                        Sign Out
                    </Text>
                    </Button>
                    <Button block
                        onPress={()=> {
                            console.log("to logreg", this.props.navigation);
                            // this.props.navigation.dispatch(actionToDispatch);
                            // this.props.navigation.actions.reset({
                            //     index: 0,
                            //     key: null
                            // });
                            this.props.navigation.navigate("AppDrawer");
                        }}
                    >
                    <Text>
                        test
                    </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
export { Setting };
const actionToDispatch = StackActions.reset({
    index: 0,
    // key: 'AppOuterStackMenu',
    actions: [ 
        NavigationActions.navigate({ routeName: "Login" }),
    ],
});
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
})