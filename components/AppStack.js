import HomeTab from './HomeTab'
import EventDetails from '../screens/event-details'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function AppStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="HomeTab" component={HomeTab} options={{headerShown: false}}/>
            <Stack.Screen name="EventDetails" component={EventDetails} 
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}