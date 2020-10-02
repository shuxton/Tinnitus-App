import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState,useRef} from 'react';
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
  Button,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as pref from "../storage/pref"
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});





export default function Preferences({navigation}){
    const [userNotifications, setUserNotifications] = useState(false);
    const [userDrugs, setUserDrugs] = useState(false);
    const [drugType, setDrugType] = useState('null');
   // const [userTime, setUserGender] = useState("0");
    const [date, setDate] = useState(new Date().getTime());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    //const [showD, setShowD] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        console.log("yo")
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        console.log("yo")
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }, []);
  
    
 
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
         schedulePushNotification(date);
          
          pref.setData('Notifs','enabled');
          pref.setData('NotifsTime',""+new Date(Date.parse(date)).getHours()+" "+new Date(Date.parse(date)).getMinutes());
      
        }else{
          pref.setData('Notifs','disabled');
          pref.setData('NotifsTime',date);
        }
       if(userDrugs){
         pref.setData('Drugs','true')
         pref.setData('DrugType',drugType)
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

      <View style={styles.SectionStyle} >
        <CheckBox
          value={userDrugs}
          onValueChange={setUserDrugs}
          style={styles.checkbox}

        />
        <Text >Do you use anti-depressants to cope with tinnitus?</Text>
              </View>
              <View style={styles.SectionStyle}>
            
       {userDrugs &&(
  <KeyboardAvoidingView enabled>
  <View style={styles.SectionStyle}>
    <TextInput
      style={styles.inputStyle}
      onChangeText={drugType => setDrugType(drugType)}
      underlineColorAndroid="black"
      placeholder="Enter Drug Name" 
      placeholderTextColor="black"
      autoCapitalize="none"
     // keyboardType="normal"
      returnKeyType="next"
      blurOnSubmit={false}
    />
  </View>
  </KeyboardAvoidingView>
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
      backgroundColor: 'white',
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
      color: 'black',
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
      color: 'black',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
     // flex: 1,
      color: 'black',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'black',
    },
    picker: {
      width: 130, 
      color:'black',
      marginRight: 50,
      marginLeft:50,
    },
  });

  async function schedulePushNotification(date) {
    Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Therapy time! 📬",
        body: "Don't miss out on your therapy",
        data: { data: 'goes here' },
      },
      trigger: {
         hour:new Date(Date.parse(date)).getHours(),
         minute:new Date(Date.parse(date)).getMinutes(),
         repeats:true
       },
    }).then(res=>{Notifications.getAllScheduledNotificationsAsync().then(res=>{console.log(res)})});
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }