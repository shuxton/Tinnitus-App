import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetails from '../screens/UserDetails'


const Stack = createStackNavigator();

const MyStack = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={UserDetails} />

      </Stack.Navigator>
   
  );
};


export default MyStack;