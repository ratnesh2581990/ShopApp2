import React, { Component } from 'react';
import { View , Text, StyleSheet } from 'react-native';
import { ProductList } from '../common';
class Main extends Component {
    render() {
        return(
            // <View style={styles.container}>
            //     <Text>
            //         Main
            //     </Text>
            // </View>
            <ProductList />
        );
    }
}
export { Main };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
})