import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Start from "../screens/Preferences"
import Next from "./bottom-navigator"

const Stack = createStackNavigator();

const MySwitch = () => {
  return (
    
      <Stack.Navigator  initialRouteName="Start"
      screenOptions={{
        animationEnabled: false
      }}
      headerMode='none'>


                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Next" component={Next} />



      </Stack.Navigator>
   
  );
};


export default MySwitch;