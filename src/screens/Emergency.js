
import React,{useEffect,useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Picker
} from 'react-native';
import * as pref from "../storage/pref"
import {CountryCodePicker, CountryCodeKey} from '../components/welcome/CountryCodes'
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import * as SMS from 'expo-sms';
import { AppLoading } from 'expo';

export default function Emergency(){
    const [text, setText] = useState(null)
    const [code, setCode] = useState('101') // default country code
    const [edit, setEdit] = useState(false) 

    function readFromStorage(){
        pref.getData('SOSContact').then( item=>{
          if(item!=null)setText(item)
        else setText('')});
    }




    useEffect(()=>{
readFromStorage();
    },[])

    const onTextChange = (number) => {
      const num = parsePhoneNumberFromString(number, CountryCodeKey[code][0])
      let reg = /^[0-9]/
      if(text.length==12 &&  number.length==13)return;
      if (!!num && text.length > number.length && !reg.test(text[text.length - 1])){
        let phone = num.nationalNumber.split('')
        phone.pop()
        phone = phone.join('')
        setText(phone)
      } else {
        setText(new AsYouType(CountryCodeKey[code][0]).input(number))
      }
    }
    function signInWithPhone() {
      const num = parsePhoneNumberFromString(text, CountryCodeKey[code][0])
      if (!!num && num.isPossible() && text.length<13 ){
        return 1;
      } else {
        alert('Please enter a valid phone number')
        return 0;
      }
    }
     
    const handleSubmitPress = () => {
     
        if(signInWithPhone()==0){return;}

     
      pref.setData('SOSContact',text)
      setEdit(false)
        //    navigation.navigate("Preferences");
        
        
    }
    if(text==null){
      return(<AppLoading></AppLoading>)
    }

   else if(text=='' || edit){

        return (
            <View style={styles.mainBody}>
               
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={{ marginTop: 100 }}>
              <View style={{height: 80, backgroundColor: 'powderblue',marginBottom:50}} >           
        <Text style={{fontSize:25,textAlign:'center'}}>Let's set up your emergency contact real quick</Text>
            </View>
            <View style={styles.SectionStyle} >
            <Picker style={styles.picker} itemStyle={{fontSize: 20, height: 95}} selectedValue={code} onValueChange={((itemVal) => setCode(itemVal))}>
        {CountryCodePicker.map(cc => <Picker.Item key={cc[2]} label={`${cc[0]} +${cc[1]}`} value={`${cc[2]}`} />)}
      </Picker>
              <TextInput
                style={styles.input2Style}
                onChangeText={num => onTextChange(num)} 
                value={text} 
                keyboardType='phone-pad'
                 placeholder='Enter Phone Number' 
                textAlign='left'
                underlineColorAndroid="black"
                placeholderTextColor="black"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>
              
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>Next</Text>
              </TouchableOpacity>
           </View>
           </ScrollView>
           </View>
        )

    }
    else{

return(
    <View style={styles.mainBody}>
               
             <ScrollView keyboardShouldPersistTaps="handled">
               <View style={{ marginTop: 200 }}></View>
                      <TouchableOpacity
                style={styles.SOSbuttonStyle}
                activeOpacity={0.5}
                onPress={()=>{sendMessage(text)}}>
                <Text style={styles.buttonTextStyle}>SOS - {text}</Text>
                
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={()=>{setEdit(true)}}>
                <Text style={styles.buttonTextStyle}>Edit Emergency Contact</Text>
              </TouchableOpacity>
               </ScrollView>
               </View>
)
    }
     }
    
  async function sendMessage(text){
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
         await SMS.sendSMSAsync(
            text,
            'This is a distress signal! I need medical help!',
          ).then(res=>{ console.log(res)});
         
    } else {
        alert("misfortune... there's no SMS available on this device")
    }
    
  }
  
     const styles = StyleSheet.create({
        mainBody: {
          flex: 1,
          justifyContent: 'center',
        //  backgroundColor: '#79a4d9',
          alignItems: 'center',
    
        },
        SectionStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          height: 40,
          marginTop: 20,
          marginLeft: 35,
          marginRight: 35,
          margin: 10,
        },
        picker: {
          width: 130, 
          marginRight: 50,
          marginLeft:50,
          color:'black',
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
        buttonTextStyle: {
          color: '#FFFFFF',
          paddingVertical: 10,
          fontSize: 16,
        },
        SOSbuttonStyle: {
            // width:210,
              flexDirection: 'row',
             justifyContent: 'center',
             backgroundColor: 'red',
             borderWidth: 50,
             color: '#FFFFFF',
             borderColor: 'red',
             height: 40,
             alignItems: 'center',
             borderRadius: 100,
             marginLeft: 35,
             marginRight: 35,
             marginTop: 20,
             marginBottom: 20,
           },
        inputStyle: {
         // flex: 1,
         width:250,
          color: 'black',
          paddingLeft: 15,
          paddingRight: 15,
          borderWidth: 1,
          borderRadius: 30,
          borderColor: 'black',
        },
        input2Style: {
          // flex: 1,
          //width:250,
           color: 'black',
           paddingLeft: 15,
           paddingRight: 15,
           borderWidth: 1,
           borderRadius: 30,
           borderColor: 'black',
         },
        picker: {
          width: 110, 
          marginRight: 10,
         color:'black',
        },
        number: {
            flexDirection: "row",
            justifyContent: 'flex-start', 
            alignItems: 'center',
            width: '100%', 
            height: 95,
          },
      });