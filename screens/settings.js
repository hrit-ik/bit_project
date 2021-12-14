import React from 'react'
import { View , Text, TouchableOpacity, StyleSheet} from 'react-native'
import { auth } from '../Backend/firebase'
import {signOut} from 'firebase/auth'

export default function Settings({navigation}) {
    const handleSignOut = () => {
        signOut(auth)
        .then(
            () => {
                navigation.replace('Login')
            }
        )
    }

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <Text>Id: {auth.currentUser?.uid}</Text>
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutButton: {
        backgroundColor: '#0782f9',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
})