import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Text, Button,  } from "native-base";
import firebase from 'react-native-firebase';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone : "+91",
            password: "",
            loggedIn: false,
            loading: false,
        }
    }
    LoginFn = () =>{
        this.setState({loading: true});
        const userRef = firebase.database().ref('users/');
        const {
            phone,
            password,
            loading,
        } = this.state
        var loginSuccess=  false;
        var user = null;
        userRef.once('value', (snapshot)=>{
            for (key in snapshot._value) {
                if (snapshot._value.hasOwnProperty(key)) {
                    if(snapshot._value[key].phone === phone && snapshot._value[key].password === password){
                        // console.log(snapshot._value[key].phone);
                        loginSuccess = true;
                        user = snapshot._value[key];
                    }
                }
            }
        }).then(() =>{
            console.log("then");
            this.setState({loggedIn: loginSuccess, loading: true});
            this.saveToStorage(user);
            this.props.navigation.navigate("AppDrawer");
            console.log("logged in");
        })
    }
    async saveToStorage(userData){
		if (userData) {
			AsyncStorage.setItem('user', JSON.stringify(userData), (err)=> {
			if(err){
				console.log("an error");
				throw err;
			}
			console.log("success", userData);
			}).catch((err)=> {
				console.log("error is: " + err);
			});
			return true;
		}
		return false;
	}
    render() {
        const {
            phone,
            password,
            loading
        } = this.state;
        return(
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Phone No.</Label>
                            <Input
                            onChangeText={value => this.setState({phone: value})}
                            value={phone}
                            />
                        </Item>
                        <Item floatingLabel >
                            <Label>Password</Label>
                            <Input 
                            secureTextEntry={true} 
                            onChangeText={value => this.setState({password: value})}
                            value={password}
                            />
                        </Item>
                    </Form>
                    <View style={styles.buttonContainer}>
                        <Button full
                        onPress={() =>{ this.LoginFn() }}
                        >
                            <Text>
                                Login
                            </Text>
                        </Button>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                        full transparent
                        onPress={()=>{this.props.navigation.navigate("ForgetPassword")}}
                        >
                            <Text>
                                Forget Password
                            </Text>
                        </Button>
                    </View>
                    
                </Content>
            </Container>
        );
    }
}
export { Login };
const styles = StyleSheet.create({
    buttonContainer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }
})