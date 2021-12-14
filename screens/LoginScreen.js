import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import {auth} from '../Backend/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import HomeTab from '../components/HomeTab';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('HomeTab')
            } else {
                console.log('user not logged in')
            }
            return unsubscribe
        })
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const {user} = userCredentials
            console.log(user.email)
        })
        .catch(error => {
            alert(error)
        })
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const {user} = userCredentials
            console.log('logged in with:  '+user.email)
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value = {email}
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder="Password"
                        value = {password}
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleLogin()}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.signupButton]}
                        onPress={() => handleSignUp()}
                    >
                        <Text style={[styles.buttonText, styles.signupButtonText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    buttonContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '700',
    },
    signupButton: {
        backgroundColor: '#0782f9',
    },
})
