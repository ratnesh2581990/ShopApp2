import React, { Component } from 'react';
import { View , StyleSheet, Alert } from 'react-native';
import { Container, Content, Form, Item, Label, Input, Text, Button,  } from "native-base";
import firebase from 'react-native-firebase';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            name: '',
            email: '',
            phone: '+91',
            password: '',
            message: '',
            error: '', 
            loading: false,
            confirmResult: null,
            codeInput: '',
            checkUserFlag: false,
        };
        
    }

    singUpFn = () => {
        const { phone, } = this.state;
        this.setState({ error: '', loading: true, message: 'Sending code ...' });
        firebase.auth().signInWithPhoneNumber(phone)
        .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
        .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    }
    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;
        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
            .then((user) => {
                this.setState({ message: 'Code Confirmed!' });
                this.nxtSignUp();
            })
            .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    }
    nxtSignUp = () =>{
        const { 
            name, 
            email,
            phone,
            password
        } = this.state;
        console.log(firebase.auth());
        firebase.database().ref('users/'+this.state.phone+'/').set({ 
            name: name, 
            email: email,
            phone: phone,
            password: password
        }).then(function() {
            console.log('Synchronization succeeded');
        })
        .catch(function(error) {
            console.log('Synchronization failed', error);
        });
    }
    checkUser = () => {
        const { 
            email,
            phone,
            // checkUserFlag
        } = this.state;
        var checkUserFlag = this.state.checkUserFlag;
        firebase.database().ref('users/').once('value', function(snapshot) {
            for (key in snapshot._value) {
                if (snapshot._value.hasOwnProperty(key)) {
                    // console.log(snapshot._value[key]);
                    if(snapshot._value[key].phone === phone || snapshot._value[key].email === email){
                        console.log(snapshot._value[key].phone);
                        checkUserFlag = true;
                    }
                }
            }
        }).then(() => {
            if(checkUserFlag){
                console.log('if', checkUserFlag)
                Alert.alert(
                    'Alert Title',
                    'My Alert Msg',
                    [
                    //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                )
            }else{
                console.log('else', checkUserFlag)
                this.singUpFn();
            }
        }).catch((error)=> {
            console.log(error)
        });
        
        
    }
    signOut = () => {
        firebase.auth().signOut();
    }
    renderRegForm() {
        const {
            buttonContainer, inlineButton
        } = styles;
        const {
            name, email, phone, password, 
        } = this.state;
        return(
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Name</Label>
                        <Input 
                        onChangeText={value => this.setState({ name: value })}
                        value={name}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input 
                        onChangeText={value => this.setState({ email: value })}
                        value={email}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Phone No.</Label>
                        <Input 
                        onChangeText={value => this.setState({ phone: value })}
                        value={phone}
                        />
                    </Item>
                    <Item floatingLabel >
                        <Label>Password</Label>
                        <Input 
                        secureTextEntry={true} 
                        onChangeText={value => this.setState({ password: value })}
                        value={password}
                        />
                    </Item>
                </Form>
                <View style={buttonContainer}>
                    <Button full
                    onPress={this.checkUser} 
                    >
                        <Text>
                            Register
                        </Text>
                    </Button>
                </View>
                <View style={buttonContainer}>
                    <View style={inlineButton}>
                        <Button
                        onPress={this.checkUser}
                        >
                            <Text>
                                test                                
                            </Text>
                        </Button>
                    </View>
                    <View style={inlineButton}>
                        <Button>
                            <Text>
                                Register
                            </Text>
                        </Button>
                    </View>
                </View>
            </Content>
        );
    }
    renderMessage() {
        const { message } = this.state;
        if (!message.length) return null;
        return (
          <View>
              <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
          </View>
        );
    }
    renderVerificationCodeInput() {
        // const { codeInput } = this.state;
        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Code</Label>
                        <Input 
                        onChangeText={
                            value => this.setState({ codeInput: value })
                        }
                        value={this.state.codeInput}
                        />
                    </Item>
                </Form>
                <View style={styles.buttonContainer}>
                    <Button full
                    onPress={this.confirmCode} 
                    >
                        <Text>
                            Confirm Code
                        </Text>
                    </Button>
                </View>
            </Content>
        );
    }
    render() {
        const { user, confirmResult } = this.state
        const {
            buttonContainer, inlineButton
        } = styles
        return(
            <Container>
                {!user && !confirmResult && this.renderRegForm()}
                {this.renderMessage()}
                {!user && confirmResult && this.renderVerificationCodeInput()}
                {user && (
                    <View
                        style={{
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#77dd77',
                        flex: 1,
                        }}
                    >
                        
                        <Text style={{ fontSize: 25 }}>Signed In!</Text>
                        <Text>{JSON.stringify(user)}</Text>
                        <Button title="Sign Out" color="red" onPress={this.signOut} />
                    </View>
                    )}
            </Container>
        );
    }
}
export { Signup };
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inlineButtonContainer: {

    },
    inlineButton: {
        flex: .5,
    }
})