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
import * as pref from "../storage/pref"

export default function UserDetails({navigation}){
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState("0");
    // const { getName, setName } = useAsyncStorage('username');
    // const { getAge, setAge } = useAsyncStorage('age');
    // const { getGender, setGender } = useAsyncStorage('gender');

   

    const handleSubmitPress = () => {
        if (!userName) {
          alert('Please fill Name');
          return;
        }
        if (!userAge) {
          alert('Please fill Age');
          return;
        }
        if(userGender=="0"){
          alert('Please select a userGender');
          return
        }
      pref.setData('username',userName);
      pref.setData('age',userAge);
      pref.setData('gender',userGender);

            navigation.navigate("Contacts");
        
        
    }
    return(
        <View style={styles.mainBody}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: 100 }}>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserName => setUserName(UserName)}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter Name" //dummy@abc.com
                  placeholderTextColor="#F6F6F7"
                  autoCapitalize="none"
                 // keyboardType="normal"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserAge => setUserAge(UserAge)}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter Age" //12345
                  placeholderTextColor="#F6F6F7"
                  keyboardType="numeric"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>

              <Picker style={styles.picker}
        userGender={userGender}
        itemStyle={{fontSize: 20, height: 95}}
          onValueChange={(itemValue, itemIndex) => setUserGender(itemValue)}
      >
                <Picker.Item label="Gender" value="0" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
        <Picker.Item label="Other" value="O" />
      </Picker>
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
    picker: {
      width: 130, 
      marginRight: 50,
      marginLeft:50,
      color:'white',
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
     width:250,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'white',
    },
   
  });