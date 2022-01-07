import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image, Button } from 'react-native'
import { TextInput } from 'react-native'
import {auth} from '../Backend/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import HomeTab from '../components/HomeTab';
import { db } from '../Backend/firestore';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { signInAnonymously } from "firebase/auth";

const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const setUserChecked = useStoreActions((actions) => actions.setUserChecked)
    const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn)
    const isLoggedIn = useStoreState((state) => state.isLoggedIn)
    const setLoading = useStoreActions((actions) => actions.setLoading)
    const setUserData = useStoreActions((actions) => actions.setUserData)
    const userData = useStoreState((state) => state.userData)
    const userChecked = useStoreState((state) => state.userChecked)
    const isAdmin = useStoreState((state) => state.isAdmin)
    const setIsAdmin = useStoreActions((actions) => actions.setIsAdmin)
    const loading = useStoreState((state) => state.loading)
    const setIsAnonymous = useStoreActions((actions) => actions.setIsAnonymous)

    useEffect(() => {
        console.log('isLoggedIn => ', isLoggedIn)
        console.log('userChecked => ', userChecked)
        console.log('loading => ', loading)
        console.log('userData => ', userData)
        console.log('isAdmin => ', isAdmin)
    } , [])

    // const addUserToDB = async (user) => {
    //     try {
    //         const docRef = await addDoc(collection(db, "users"), {
    //           email: user.email,
    //           uid: user.uid,
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    // }
    const addUserToDB = async (user) => {
        const docRef = await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            isAdmin: false,
            adminOf: [],
        });
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             navigation.replace('HomeTab')
    //         } else {
    //             console.log('user not logged in')
    //         }
    //         return unsubscribe
    //     })
    // }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const {user} = userCredentials
            console.log(user.email)
            addUserToDB(user)
            setIsAnonymous(false)
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
            setIsAnonymous(false)
        })
        .then(() => {setIsLoggedIn(true)})
        .catch(error => {
            alert(error)
        })
    }

    const handleAnonymousLogin = () => {
        signInAnonymously(auth)
        .then(console.log('logged in anonymously'))
        .then(() => {
            setIsAnonymous(true)
            setIsLoggedIn(true)
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image source={require('./../assets/images/bit.png')} style={styles.logo}/>
                </View>

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
                    <Button 
                        title="Continue w/o login"
                        onPress={() => {handleAnonymousLogin()}}
                    />
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
    // signupButtonText: {
    //     color: '#fff',
    // },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
    },
    logo: {
        width: 250,
        height: 160,
        borderRadius: 20,
    }
})
