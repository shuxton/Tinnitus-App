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
  Picker,
  CheckBox,
  Button
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as pref from "../storage/pref"


export default function UserDetails({navigation}){
    const [userNotifications, setUserNotifications] = useState(false);
   // const [userTime, setUserGender] = useState("0");
    const [date, setDate] = useState(new Date().getTime());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
   

    const handleSubmitPress = () => {
        
       
        if(userNotifications){
          pref.setData('Notifs','enabled');
          pref.setData('NotifsTime',date);
      
        }else{
          pref.setData('Notifs','disabled');
          pref.setData('NotifsTime',date);
        }
       
        navigation.navigate("Next");
        
    }
    return(
        <View style={styles.mainBody}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: 100 }}>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle} >
        <CheckBox
          value={userNotifications}
          onValueChange={setUserNotifications}
          style={styles.checkbox}

        />
        <Text >Would you like to recieve scheduled therapy notifications?</Text>
              </View>
              <View style={styles.SectionStyle}>
            
       {userNotifications &&(
 <View>
 <Button onPress={showTimepicker} title="Select time" />
</View>
       )}   
     
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
          marginLeft:10,
          
        alignSelf: "center",
        //backgroundColor:'yellow',
        borderRadius:30
      },
      label: {
        margin: 8,
       // fontSize:30,
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
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'white',
    },
    picker: {
      width: 130, 
      color:'white',
      marginRight: 50,
      marginLeft:50,
    },
  });