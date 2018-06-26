import React, { Component } from 'react';
import { View , Text, StyleSheet } from 'react-native';

class ForgetPassword extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>
                    ForgetPassword
                </Text>
            </View>
        );
    }
}
export { ForgetPassword };
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
})