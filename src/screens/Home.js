
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,
  BackHandler,
  ToastAndroid,Button,Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as pref from "../storage/pref"
import { ProgressChart} from "react-native-chart-kit";
import axios from "axios"
import { PhoneNumber } from 'libphonenumber-js';
 const screenWidth = Dimensions.get("window").width;

export default function Home(){
  const [username, setUsername] = useState('hello')
  const [age, setAge] = useState(null)
  const [CountryCode, setCountryCode] = useState(null)
  const [SOSContact, setSOSContact] = useState(null)
  const [drug, setDrug] = useState(null)
  const [phone, setPhone] = useState(null)
  const [gender, setGender] = useState(null)
  const [appUsage, setAppUsage] = useState(0)
  const [second, setSecond] = useState(1)
  const [token, setToken] = useState(0)
  const [date, setDate] = useState(0)
  const [data,setData]=useState({
    
      labels: ["Therapy"], 
      data: [0]
    
  })
 


  function readItemFromStorage () {
    //pref.setData('token','true')
    pref.getData('appUsage').then(res=>{
      if(res!=null){
      setAppUsage(res);
      if(parseInt(appUsage)/6>1)
 setData({
  labels: ["Therapy"],
  data: [1]
});
else 
setData({
  labels: ["Therapy"],
  data: [(parseInt(appUsage)/6)]
});
      }
    })
     pref.getData('username').then( item=>{setUsername(item)});
     pref.getData('Phone').then( item=>{setPhone(item)});
     pref.getData('CountryCode').then( item=>{setCountryCode(item)});
     pref.getData('SOSContact').then( item=>{setSOSContact(item)});
     pref.getData('age').then( item=>{setAge(item)});
     pref.getData('gender').then( item=>{setGender(item)});
     pref.getData('DrugType').then( item=>{setDrug(item)});
     pref.getData('date').then(res=>{
      setDate(res)
      if(parseInt(res)<new Date().getDate()){
      
pref.setData('date',new Date().getDate());
pref.setData('appUsage',0);
    }
  })

    pref.getData('token').then( item=>{
      if(item==null && token==0){
        let key=new Date().getTime().toString()+username+(Math.random()*100).toString()
        pref.setData('token',key)
      setToken(key)
    }
    else{
      setToken(item)
  
    }
    
  });

};
        //console.log(token)
      
    
 
  useEffect(()=>{

    const interval =
     setInterval(() => {
     // console.log(second)

    setSecond(second => second + 1);
if(second%300==0) {pref.getData('appUsage').then(res=>{
pref.setData('appUsage',parseInt(res)+1);
setAppUsage(parseInt(res)+1);


let params = new URLSearchParams();
params.append('token',token);
params.append('username', username);
params.append('age', age);
params.append('gender', gender);
params.append('contact', phone);
params.append('countryCode', CountryCode);
params.append('emergencyContact', SOSContact);
params.append('meds', drug);
params.append('appUsage',appUsage);
axios
.post('http://tinnitus-server.herokuapp.com/input/data', params)
.then(res => {
console.log(res.data)
})
.catch(error => {
console.error(error)
})


if(parseInt(appUsage)/6>1)
setData({
  labels: ["Therapy"],
  data: [1]
});
else 
setData({
  labels: ["Therapy"],
  data: [(parseInt(appUsage)/6)]
});
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
  },[]);


 
  const chartConfig = {
    backgroundGradientFrom: "#4682B4",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#4682B4",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

    return(
      
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            marginTop:30
          }}>
            <Text style={{fontSize:35,textAlign:'center',marginBottom:10}}>Tinnitus Therapy</Text>
            <View>
            <View style={{height: 40, backgroundColor: 'powderblue'}} >           
        <Text style={{fontSize:25,textAlign:'center'}}>Welcome  {username} </Text>
            </View>
            <ScrollView>
            {/* <View style={{height: 37, backgroundColor: 'steelblue'}}>
            <Text style={{fontSize:15,textAlign:'center'}}>We recommend {contact} a 30 minute therapy at least once in a day</Text>

            </View>
            <View style={{height: 37, backgroundColor: 'steelblue'}}>
            <Text style={{fontSize:15,textAlign:'center'}}>{username}</Text>

            </View> */}
  
            <View style={styles.buttonWrapper} style={{height: 470, backgroundColor: 'steelblue'}}>
            <Text style={{fontSize:15,textAlign:'center',color:'white'}}>Recommended a minimum of 30 minutes of therapy</Text>

            <ProgressChart
  data={data}
  width={screenWidth}
  height={280}
  strokeWidth={32}
  radius={64}
  chartConfig={chartConfig}
  hideLegend={true}
/>
<View style={styles.buttonStyle}>
<Text style={styles.buttonTextStyle}>Daily Progress - {Math.round(data.data[0]*100)}% </Text>

</View>
<Text style={{fontSize:15,textAlign:'center',color:'white'}}>(Based on app usage)</Text>

            </View>
           
            </ScrollView>
            </View>
            </View>
         
    )
}

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
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
},
buttonStyle: {
  // width:210,
    flexDirection: 'row',
   justifyContent: 'center',
   backgroundColor: '#7DE24E',
   borderWidth: 0,
   color: '#FFFFFF',
   borderColor: '#7DE24E',
   height: 40,
   alignItems: 'center',
   borderRadius: 30,
   marginLeft: 35,
   marginRight: 35,
   marginTop: 20,
   marginBottom: 20,
 },
})