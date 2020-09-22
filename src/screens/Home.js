import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text,Dimensions, View,
  BackHandler,
  ToastAndroid,Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as pref from "../storage/pref"


export default function Home(){
  const [username, setUsername] = useState('hello')
  const [age, setAge] = useState(null)
  const [contact, setContact] = useState(null)
  const [gender, setGender] = useState(null)
  const [appUsage, setAppUsage] = useState(0)
  const [second, setSecond] = useState(598)
  const [minute, setMinute] = useState(0)

  function readItemFromStorage () {

     pref.getData('username').then( item=>{setUsername(item)});
      pref.getData('age').then( item=>{setAge(item)});
      pref.getData('gender').then( item=>{setGender(item)});
      pref.getData('Phone').then( item=>{setContact(item)});
      pref.getData('date').then(res=>{
        if(parseInt(res)<new Date().getDate()){
pref.setData('date',new Date().getDate());
pref.setData('appUsage',0);
      }
    })
  };
  useEffect(()=>{
    const interval = setInterval(() => {
    setSecond(second => second + 1);
if(second%600==0) {pref.getData('appUsage').then(res=>{

pref.setData('appUsage',parseInt(res)+1);
setAppUsage(parseInt(res)+1);
})
}
  }, 1000);
  return () => clearInterval(interval);
})
  useEffect(() => {
    
    readItemFromStorage();
    BackHandler.addEventListener('hardwareBackPress', () => {ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);return true})
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', () => {ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);return true})
  },);

    return(
      
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            <Text style={{fontSize:35,textAlign:'center',marginBottom:10}}>Tinnitus Therapy</Text>
            <View>
            <View style={{height: 40, backgroundColor: 'powderblue'}} >           
             <Text style={{fontSize:25,textAlign:'center'}}>Welcome {username}</Text>
            </View>
            <ScrollView>
            <View style={{height: 37, backgroundColor: 'skyblue'}}>
            <Text style={{fontSize:15,textAlign:'center'}}>We recommend a 30 minute therapy at least once in a day</Text>

            </View>
            <View style={styles.buttonWrapper} style={{height: 380, backgroundColor: 'steelblue'}}>
        {/* <Text style={styles.secondText}>{appUsage}:{second}</Text>

            <Button
        title="Start"
      
      /> */}
       
            </View>
           
            </ScrollView>
            </View>
            </View>
         
    )
}

const styles = StyleSheet.create({
  buttonWrapper: {
      width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
},
secondText: {
  color:'red',
  marginTop:20,
  marginBottom:20,
  textAlign:'center',
  fontSize: 25,
}
})