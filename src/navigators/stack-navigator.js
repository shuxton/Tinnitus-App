import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Videos from '../screens/Videos'
import VideoPlayer from '../screens/VideoPlayer'

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Tinnitus' }}
        /> */}
        <Stack.Screen name="Videos" component={Videos} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MyStack;