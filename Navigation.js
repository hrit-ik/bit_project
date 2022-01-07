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
import AuthStack from './components/AuthStack';
import AppStack from './components/AppStack';
import { db } from './Backend/firestore';
import { collection, getDocs } from "firebase/firestore"; 

const Stack = createNativeStackNavigator();
const Loading = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
}
const Navigation = () => {
    // const todos = useStoreState((state) => state.todos);
    const userChecked = useStoreState((state) => state.userChecked);
    const isLoggedIn = useStoreState((state) => state.isLoggedIn);
    // const loading = useStoreState((state) => state.loading);
    const userData = useStoreState((state) => state.userData);
    const setUserChecked = useStoreActions((actions) => actions.setUserChecked);
    const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);
    const setUserData = useStoreActions((actions) => actions.setUserData);
    const loading = useStoreState((state) => state.loading);
    const setLoading = useStoreActions((actions) => actions.setLoading);
    const clubs = useStoreState((state) => state.clubs);
    const setClubs = useStoreActions((actions) => actions.setClubs);
    const isAnonymous = useStoreState((state) => state.isAnonymous);

  useEffect(() => {
    async function getClubs() {
      var data = []
      const querySnapshot = await getDocs(collection(db, "clubs"));
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({...doc.data(),id:doc.id});
      });
      console.log(data);
      setClubs(data);
      setLoading(false);
    }
    getClubs();
  } , []);

  onAuthStateChanged(auth, user=>{
    if (user) {
      if(isAnonymous){
        getUserInfo('anonymous')
          .then(doc=>{ setUserData(doc.data());})
          .then(()=>{setLoading(false);})
      }
      else{
        getUserInfo(user.uid)
          .then(doc => setUserData(doc.data()))
          .then(() => setLoading(false))
      }
    }
    else{
      setUserChecked(true);
      setLoading(false);
    }
  })
  return(
    <NavigationContainer>
      {loading ? <Loading/>: (isLoggedIn? <AppStack /> : <AuthStack />)}
    </NavigationContainer>
    )

}

export default Navigation

