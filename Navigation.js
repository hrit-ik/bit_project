import * as React from 'react';
import { useEffect, useState, useContext, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from './screens/event-details';
import LoginScreen from './screens/LoginScreen';
import HomeTab from './components/HomeTab';
import {auth} from './Backend/firebase';
import SplashScreen from './screens/SplashScreen';
import { getUserInfo } from './Backend/getUserInfo';
import { onAuthStateChanged } from "firebase/auth";
import Skeleton from './screens/LoadingScreen';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Stack = createNativeStackNavigator();
const Navigation = () => {
    // const todos = useStoreState((state) => state.todos);
    const userChecked = useStoreState((state) => state.userChecked);
    const isLoggedIn = useStoreState((state) => state.isLoggedIn);
    const loading = useStoreState((state) => state.loading);
    const userData = useStoreState((state) => state.userData);
    const setUserChecked = useStoreActions((actions) => actions.setUserChecked);
    const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);
    const setLoading = useStoreActions((actions) => actions.setLoading);
    const setUserData = useStoreActions((actions) => actions.setUserData);
    const isAdmin = useStoreState((state) => state.isAdmin);
    const setIsAdmin = useStoreActions((actions) => actions.setIsAdmin);

//     const [userChecked, setUserChecked] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState(null)
  // const [userData, setUserData] = useState(null)
  // const {userDataState} = useContext(SettingsProvider)
  // const [userData, setUserData] = userDataState
  onAuthStateChanged(auth, user=>{
    if (user) {
      getUserInfo(user.uid)
        .then(doc => setUserData(doc.data()))
        // .then(() => {setIsLoggedIn(true); setLoading(false); })
        .then(() => {setIsLoggedIn(true); setLoading(false); })
        .then(() => setUserChecked(true))
    }
    else{
        setUserData(null)
        setUserChecked(true)
        setIsLoggedIn(false)
    }
  })



    return (
        <NavigationContainer>
            <Stack.Navigator>
            {!userChecked? (<Stack.Screen name="SpashScreen" component={SplashScreen} options={{headerShown: false}}/>):
            (!isLoggedIn?(
              <>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
              </>
            ):
            (loading && !userData?(<Stack.Screen name="skeleton" component={Skeleton} options={{headerShown: false}}/>): (
                <>
                <Stack.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}}/>
                <Stack.Screen name="EventDetails" component={EventDetails} 
                    options={{
                        headerShown: false
                    }}
                />
                </>
            )))

            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

