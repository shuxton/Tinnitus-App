import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Bottom from './src/navigators/bottom-navigator'
import Welcome from './src/navigators/welcome-stack-navigator'
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import * as pref from "./src/storage/pref"


export default function App() {
  const [value, setValue] = useState('false');

  function readItemFromStorage(){
    pref.getData('date').then(res=>{
      if(res==null || parseInt(res)<new Date().getDate()){
pref.setData('date',new Date().getDate());
pref.setData('appUsage',0);
    }
  })
     pref.getData('token').then(res=>{
      setValue(res);
     // pref.setData('token','false')
      if(res==null){
        
        pref.setData('appUsage',0)
        pref.setData('date',new Date().getDate())
       }
    })
    
  };
  useEffect(() => {
    readItemFromStorage();
  }, []);



 
if(value=='false'){
    return(<AppLoading></AppLoading>)
  }
  else if(value=='true')
  return (
    <NavigationContainer >
       <Bottom>   
    </Bottom>
    </NavigationContainer>
   
  ); 
 else

  return(
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

