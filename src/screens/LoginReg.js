import React, { Component } from 'react';
import { View , StyleSheet, } from 'react-native';
import { Container, Content, Text, Button,  } from "native-base";
class LoginReg extends Component {
    render() {
        return(
            <Container>
                <Content contentContainerStyle={styles.container} >
                    <Button style={styles.buttonContainer} rounded bordered block 
                    onPress={() => this.props.navigation.navigate("Login")} >
                        <Text>
                            Login
                        </Text>
                    </Button>
                    <Button rounded block 
                    onPress={() => this.props.navigation.navigate("Signup")} >
                        <Text>
                            Register
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
export { LoginReg };
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 10,
    }
})