import React, { Component } from 'react';
import { View , Text, StyleSheet, AsyncStorage, YellowBox } from 'react-native';
import firebase from 'react-native-firebase';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class Splash extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            loggedIn: false
        };
    }
    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCOwq8BstEwdxJNxU3DWVcO5JbzElHqzNs",
                authDomain: "shopapp-2e32b.firebaseapp.com",
                databaseURL: "https://shopapp-2e32b.firebaseio.com",
                projectId: "shopapp-2e32b",
                storageBucket: "shopapp-2e32b.appspot.com",
                messagingSenderId: "828370830639"
            });
        }



        this.getToken();

        // this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
        //     this.setState({
        //         loading: false,
        //         user,
        //     });
        // });
        // console.log(firebase);
    }
    async getToken() {
        console.log('token start ');
		try {		  
            // console.log('async test');
            // console.log(AsyncStorage.getItem('user'));
            const user = await AsyncStorage.getItem('user');
            console.log("user",user);
            this.setState({
                loading: false,
                loggedIn: user == null ? false : true,
            });
            // if(!userPhone) {
            //     console.log(userPhone+'condition 1');
            //     TempLogin();
            // } else {
            //     this.setState({userPhone: userPhone});
            //     console.log(userPhone+'condition 2');
            //     this.props.navigation.navigate('Routers')
            // }
		} catch(error) {
			console.log(userPhone+'condition 3');
			console.log("Something went wrong", error);
        }
    }
    componentWillUnmount() {
        // this.authSubscription();
    }

    render() {
        if (!this.state.loading){
            this.state.loggedIn ? this.props.navigation.navigate("AppDrawer") : this.props.navigation.navigate("LoginReg");
        }
        return(
            <View style={styles.container}>
                <Text>
                    Splash
                </Text>
            </View>
        );
    }
    
    
}
export { Splash };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
})