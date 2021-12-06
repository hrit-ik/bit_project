import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details',{
                    itemId: Math.floor(Math.random() * 100),
                    otherParam: 'anything I might want',
                })}
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
