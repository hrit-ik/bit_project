import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from '../screens/event-details';
import Home from '../screens/home';

const Stack = createNativeStackNavigator();
export default function HomeStacks() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="EventDetails" component={EventDetails} 
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}
