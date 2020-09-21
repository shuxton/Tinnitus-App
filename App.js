import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Bottom from './src/navigators/bottom-navigator'
import Welcome from './src/navigators/welcome-stack-navigator'
import { useAsyncStorage } from '@react-native-community/async-storage';
import { StyleSheet, Text, View } from 'react-native';



export default function App() {
  const [value, setValue] = useState('false');
  const { getItem, setItem } = useAsyncStorage('@storage_key');

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
    if(item==null){
     async () => {
        await setItem('true');
      };
    }
  };
  useEffect(() => {
    readItemFromStorage();
  }, []);

  if(value=='true')
  return (
    <NavigationContainer >
       <Bottom>   
    </Bottom>
    </NavigationContainer>
   
  );
  else return(
    <NavigationContainer >
    <Welcome>   
 </Welcome>
 </NavigationContainer>
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
