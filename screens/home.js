import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStoreState, useStoreActions } from 'easy-peasy';


const Tab = createBottomTabNavigator();
export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Button
                title="Open the Post"
                onPress={() => navigation.navigate('EventDetails')}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 236,139,1)',
        
    }
})
