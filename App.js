import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Details from './screens/details';
import Settings from './screens/settings';
import {Ionicons} from '@expo/vector-icons';
import HomeStack from './components/homeStack';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator 
          screenOptions={({ route })=>({
            tabBarStyle: { 
              borderTopRightRadius: 50,
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
              position: 'absolute',
              shadowOffset: { width: 0, height: -7 },
              shadowRadius: 20,
              shadowColor: 'rgba(0,0,0, 1)',
              shadowOpacity: 0.25,
              // elevation: 5,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'HomeStack') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'cog' : 'cog-outline';
              }
              else if (route.name === 'Details') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={25} color='#7387cd'/>;
            },
          })}
        >
          <Tab.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/>
          <Tab.Screen name="Details" component={Details} />
          <Tab.Screen name="Settings" component={Settings} options={{ tabBarBadge: 3 }}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
