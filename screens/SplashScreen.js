import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';

const SplashScreen = ({route, navigation}) => {
    return (
        <LottieView source={require('./../LottieFiles/rocket.json')} autoPlay loop />
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