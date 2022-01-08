import React, {useContext} from 'react'
import { View , Text, TouchableOpacity, StyleSheet, Switch} from 'react-native'
import { auth } from '../Backend/firebase'
import {signOut} from 'firebase/auth'
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function Settings({route, navigation}) {
    const setLoading = useStoreActions((actions) => actions.setLoading)
    const setUserData = useStoreActions((actions) => actions.setUserData)
    const userData = useStoreState((state) => state.userData)
    const adminMode = useStoreState((state) => state.adminMode)
    const setAdminMode = useStoreActions((actions) => actions.setAdminMode)
    const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn)
    const isAnonymous = useStoreState((state) => state.isAnonymous)
    const setIsAnonymous = useStoreActions((actions) => actions.setIsAnonymous)

    const toggleAdminMode = () => {
        setAdminMode(!adminMode)
      }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            // setUserChecked(false)
            // setIsLoggedIn(false)
            setIsLoggedIn(false);
            setUserData(null)
            setLoading(true)
            if(isAnonymous) {setIsAnonymous(false)}
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
            {userData && userData.isAdmin && <TouchableOpacity style={styles.editEvents} onPress={() => {navigation.navigate('EditEventsScreen')}}>
                <Text>Edit Events</Text>
            </TouchableOpacity>}
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
    editEvents: {
        backgroundColor: '#0782f9',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
    },
})