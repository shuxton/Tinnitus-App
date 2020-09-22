import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MusicPlayer from '../screens/MusicPlayer'


const Stack = createStackNavigator();

const MyStack = () => {
  return (
    
      <Stack.Navigator >
        <Stack.Screen options={{headerShown: false}} name="Music Therapy" component={MusicPlayer} />

      </Stack.Navigator>
   
  );
};


export default MyStack;