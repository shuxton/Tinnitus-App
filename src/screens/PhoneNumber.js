import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Picker
} from 'react-native';
import {CountryCodePicker, CountryCodeKey} from '../components/welcome/CountryCodes'
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import * as pref from "../storage/pref"


export default function PhoneNumber({navigation}){
    const [text, setText] = useState('')
    const [code, setCode] = useState('101') // default country code
    

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
      pref.setData('Phone',text)
      pref.setData('CountryCode', CountryCodeKey[code][0])

     navigation.navigate("Preferences");
     

    }


    return(
        <View style={styles.mainBody}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: 100 }}>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle} >
              <Picker style={styles.picker} itemStyle={{fontSize: 20, height: 95}} selectedValue={code} onValueChange={((itemVal) => setCode(itemVal))}>
          {CountryCodePicker.map(cc => <Picker.Item key={cc[2]} label={`${cc[0]} +${cc[1]}`} value={`${cc[2]}`} />)}
        </Picker>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={num => onTextChange(num)} 
                  value={text} 
                  keyboardType='phone-pad'
                   placeholder='Enter Phone Number' 
                  textAlign='left'
                  underlineColorAndroid="#FFFFFF"
                  placeholderTextColor="#F6F6F7"
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
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#79a4d9',
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
    inputStyle: {
     // flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 5,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'white',
    },
    picker: {
      width: 110, 
      marginRight: 10,
     color:'white',
    },
    number: {
        flexDirection: "row",
        justifyContent: 'flex-start', 
        alignItems: 'center',
        width: '100%', 
        height: 95,
      },
  });
