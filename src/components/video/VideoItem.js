import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function VideoList({video,onVideoSelect,navigation}){
    return(
        <TouchableOpacity
        onPress={()=>navigation.navigate("VideoPlayer",{videoId:video.id.videoId,title:video.snippet.title})}
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
               <Text style={{fontSize:12, 
                                  width:Dimensions.get("screen").width/2,
                //color:textcolor
                }} numberOfLines={2}>{video.snippet.channelTitle}</Text>
           </View>
    </View>
    </TouchableOpacity>

    //     <View style={{marginBottom:10}} >
    //         <Image 
    //          source={video.snippet.thumbnails.medium.url}
    //          style={{
    //              width:"100%",
    //              height:200
    //          }}/>
    //       <View style={{
    //      flexDirection:"row",
    //      margin:5
    //  }}>
    // <Text style={{
    //              fontSize:20,
    //              width:Dimensions.get("screen").width - 50,
    //             // color:textcolor

    //          }}
    //          ellipsizeMode="tail"
    //          numberOfLines={2}
    //          >{video.snippet.title}</Text>
    //          <Text style={{
    //            // color:textcolor

    //         }}>{video.snippet.channelTitle}</Text>
    //  </View>
    //  </View>
    //        <Card style={{ width: "100%", height: "325px", marginBottom: "10px" }}>
    //   <Card.Body
    //     onClick={() => {
    //       onVideoSelect(video);
    //     }}
    //   >
    //     <Card.Img
    //       variant="top"
    //       src={video.snippet.thumbnails.medium.url}
    //       alt="Thumbnail unavailable"
    //       style={{ width: "100%", height: "50%", marginBottom: "25px" }}
    //     />
    //     <Card.Subtitle style={{ marginBottom: "5px" }}>
    //       {video.snippet.title}
    //     </Card.Subtitle>
    //     <Card.Subtitle className="mb-2 text-muted">
    //       {video.snippet.channelTitle}
    //     </Card.Subtitle>

    //     <Card.Link href="#">Watch</Card.Link>
    //   </Card.Body>
    // </Card>
       
    )
}