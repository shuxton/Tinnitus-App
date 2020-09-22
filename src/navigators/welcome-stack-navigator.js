import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetails from '../screens/UserDetails'
import PhoneNumber from '../screens/PhoneNumber'
import Preferences from './switch-navigator'


const Stack = createStackNavigator();

const MyStack = () => {
  return (
    
      <Stack.Navigator initialRouteName="User"
      screenOptions={{
        animationEnabled: false
      }}
      headerMode='none'>

        <Stack.Screen name="User" component={UserDetails} />

                <Stack.Screen name="Contacts" component={PhoneNumber} />
                <Stack.Screen name="Preferences" component={Preferences} />



      </Stack.Navigator>
   
  );
};


export default MyStack;