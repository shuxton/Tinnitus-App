import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Videos from '../screens/Videos'
import VideoPlayer from '../screens/VideoPlayer'


const Stack = createStackNavigator();

const MyStack = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Videos" component={Videos} />
        <Stack.Screen name="Video Therapy" component={VideoPlayer} />

      </Stack.Navigator>
   
  );
};


export default MyStack;