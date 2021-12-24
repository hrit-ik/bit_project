import React, {useState, useContext, useEffect} from 'react'
import { View , Text, TouchableOpacity, StyleSheet, Switch} from 'react-native'
import { auth } from '../Backend/firebase'
import {signOut} from 'firebase/auth'
import { SettingsContext } from '../components/settingsContext'
import { getUserInfo } from '../Backend/getUserInfo'


export default function Settings({route, navigation}) {
    const {administrationState} = useContext(SettingsContext)
    const user = auth.currentUser;
    const [adminMode, setAdminMode]  = administrationState
    const toggleAdminMode = () => {
      setAdminMode(!adminMode)
    }
    // const [userData, setUserData] = useState(null)
    // if(user){
    //     useEffect(() => {
    //         getUserInfo(user.uid)
    //         .then(doc => setUserData(doc.data()))
    //     }, []);
    // }
    
    const {userData} = route.params
    console.log(userData)

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
            {/* <Text>Email: {auth.currentUser?.email}</Text>
            <Text>Id: {auth.currentUser?.uid}</Text> */}
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
            {/* {userData && userData.isAdmin && <View>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={adminMode ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleAdminMode}
                    value={adminMode}
                />
            </View>} */}
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