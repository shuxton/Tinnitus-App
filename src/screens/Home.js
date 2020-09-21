import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text,Dimensions, View } from 'react-native';

export default function Home(){
    return(
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            <View style={{height: 50, backgroundColor: 'powderblue'}} />
            <View style={{height: 50, backgroundColor: 'skyblue'}} />
            <View style={{height: 100, backgroundColor: 'steelblue'}} />
       
           
            </View>
         
    )
}

