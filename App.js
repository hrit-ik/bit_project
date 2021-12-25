import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from './screens/event-details';
import LoginScreen from './screens/LoginScreen';
import HomeTab from './components/HomeTab';
import { SettingsProvider } from './components/settingsContext';
import {auth} from './Backend/firebase';
import LoadingScreen from './screens/SplashScreen';
import { getUserInfo } from './Backend/getUserInfo';
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();
export default function App() {
  const user = auth.currentUser;
  // const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const {userDataState} = useContext(SettingsProvider)
  // const [userData, setUserData] = userDataState
  const [userData, setUserData] = useState(null)

  onAuthStateChanged(auth, user=>{
    if (user) {
      getUserInfo(user.uid)
        .then(doc => setUserData(doc.data()))
        .then(() => {setIsLoggedIn(true); setLoading(false); })
    }
    else{
      setIsLoggedIn(false);
    }
  })


  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? loading?(
            <LoadingScreen />
          ):(
            <>
              <Stack.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}} initialParams={{userData}}/>
              <Stack.Screen name="EventDetails" component={EventDetails} 
                options={{
                    headerShown: false
                }}
                initialParams={{userData}}
            />
            </>
          ):(
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}  initialParams={{userData}}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
