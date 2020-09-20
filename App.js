import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Stack from './src/navigators/stack-navigator'
import { StyleSheet, Text, View } from 'react-native';
import VideoPlayer from './src/screens/VideoPlayer'
import Videos from './src/screens/Videos'


export default function App() {


  return (
    <Stack></Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
