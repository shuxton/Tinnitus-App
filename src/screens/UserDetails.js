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
} from 'react-native';

export default function UserDetails(){
    let [userName, setUserName] = useState('');
    let [userAge, setUserAge] = useState('');
    let [errortext, setErrortext] = useState('');
    const [value, onChangeText] = React.useState('Useless Placeholder');
    const handleSubmitPress = () => {
        setErrortext('');
        if (!userName) {
          alert('Please fill Name');
          return;
        }
        if (!userAge) {
          alert('Please fill Age');
          return;
        }
        
    }
    return(
        <View style={styles.mainBody}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: 100 }}>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: 'center' }}>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserName => setUserName(UserName)}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Enter Name" //dummy@abc.com
                  placeholderTextColor="#F6F6F7"
                  autoCapitalize="none"
                  keyboardType="email-address"
                
                  returnKeyType="next"
                //   onSubmitEditing={() =>
                //     this._Ageinput && this._Ageinput.focus()
                //   }
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
                //   ref={ref => {
                //     this._Ageinput = ref;
                //   }}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                 // secureTextEntry={true}
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}> {errortext} </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
              //  onPress={() => props.navigation.navigate('RegisterScreen')}
              >
                New Here ? Register
              </Text>
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
      backgroundColor: '#307ecc',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
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
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'white',
    },
    registerTextStyle: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
  });