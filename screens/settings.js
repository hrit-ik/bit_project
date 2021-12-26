import React, {useContext} from 'react'
import { View , Text, TouchableOpacity, StyleSheet, Switch} from 'react-native'
import { auth } from '../Backend/firebase'
import {signOut} from 'firebase/auth'
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function Settings({route}) {
    const setLoading = useStoreActions((actions) => actions.setLoading)
    const setUserData = useStoreActions((actions) => actions.setUserData)
    const userData = useStoreState((state) => state.userData)
    const adminMode = useStoreState((state) => state.adminMode)
    const setAdminMode = useStoreActions((actions) => actions.setAdminMode)

    const toggleAdminMode = () => {
        setAdminMode(!adminMode)
      }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            // setUserChecked(false)
            // setIsLoggedIn(false)
            setUserData(null)
            setLoading(true)
            // setUserChecked(true)
            // setSignedOut(true)
            // setLoading(false)   
        })
    }

    return (
        <View style={styles.container}>
            {/* <Text>Email: {auth.currentUser?.email}</Text>
            <Text>Id: {auth.currentUser?.uid}</Text> */}
            {userData && <Text>{userData.email}</Text>}
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
            {userData && userData.isAdmin && <View>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={adminMode ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleAdminMode}
                    value={adminMode}
                />
            </View>}
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