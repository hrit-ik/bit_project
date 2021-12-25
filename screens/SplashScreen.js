import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SplashScreen = ({route, navigation}) => {
    return (
        <View style={styles.container}>
            <Text>loading</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})