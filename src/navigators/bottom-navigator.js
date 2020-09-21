import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Videos from '../screens/Videos'
import VideoStack from './stack-navigator'
import MusicStack from './music-stack-navigator'


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen  name="Home" component={Home} />
      <Tab.Screen  name="Music" component={MusicStack} />
      <Tab.Screen  name="Videos" component={VideoStack} />
    </Tab.Navigator>
  );
}

export default MyTabs;