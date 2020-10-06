import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function VideoList({video,onVideoSelect,navigation}){
    return(
        <TouchableOpacity
        onPress={()=>navigation.navigate("Video Therapy",{videoId:video.id.videoId,title:video.snippet.title})}
        >
        <View style={{flexDirection:"row",margin:10,marginBottom:0}}>
        <Image 
           source={{uri:video.snippet.thumbnails.medium.url}}
           style={{
               width:"45%",
               height:100
           }} />
           <View style={{
               paddingLeft:7
           }}>
               <Text style={{
                   fontSize:17,
                   width:Dimensions.get("screen").width/2,
                   //color:textcolor
               }}
               ellipsizeMode="tail"
               numberOfLines={3}
               > {video.snippet.title}</Text>
            
           </View>
    </View>
    </TouchableOpacity>
 
    )
}