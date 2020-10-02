import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,ScrollView,SafeAreaView } from 'react-native';
import VideoList from '../components/video/VideoList';
import { AppLoading } from 'expo';

const videoData= [
  {
     "etag": "3lRjoHtB1O74KVGlBpA4_tMFqh0",
     "id":{
       "kind": "youtube#video",
       "videoId": "KO8Ing0d21A",
     },
     "snippet":{
       "channelId": "UCwobzUc3z-0PrFpoRxNszXQ",
       "channelTitle": "Yellow Brick Cinema - Relaxing Music",
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://i.ytimg.com/vi/KO8Ing0d21A/mqdefault_live.jpg",
           "width": 320,
         },
       },
       "title": "Relaxing Music",
     },
   },
  {
     "etag": "apiTrI2u-fNVaC6naJiUiyU5GdI",
     "id":{
       "kind": "youtube#video",
       "videoId": "eDCgksLBU3w",
     },
     "snippet":{
       "channelId": "UCwobzUc3z-0PrFpoRxNszXQ",
       "channelTitle": "Yellow Brick Cinema - Relaxing Music",
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://i.ytimg.com/vi/eDCgksLBU3w/mqdefault_live.jpg",
           "width": 320,
         },
       },
       "title": "Healing Music",
     },
   },
  {
     "etag": "0cdWSu18YbiwPRPzKIODDo10ZuM",
     "id":{
       "kind": "youtube#video",
       "videoId": "t_QwcZ6LevU",
     },
     "snippet":{
       "channelId": "UCwobzUc3z-0PrFpoRxNszXQ",
       "channelTitle": "Yellow Brick Cinema - Relaxing Music",
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://i.ytimg.com/vi/t_QwcZ6LevU/mqdefault_live.jpg",
           "width": 320,
         },
       },
       "title": "Meditation Music",
     },
   },
  {
     "etag": "OD3Lb-QNBe7SnfWmKaMLX5yBkqk",
     "id":{
       "kind": "youtube#video",
       "videoId": "5qap5aO4i9A",
     },
     "snippet":{
       "channelId": "UCSJ4gkVC6NrvII8umztf0Ow",
       "channelTitle": "ChilledCow",
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault_live.jpg",
           "width": 320,
         },
       },
       "title": "Chill Pill",
     },
   },
  {
     "etag": "-0Rn_9LaBcE0vNDyeMrMqsgGGIk",
     "id":{
       "kind": "youtube#video",
       "videoId": "CcmXERhrh5g",
     },
     "snippet":{
       "channelId": "UCmQK52xYtdeg7EYiQhqEeZA",
       "channelTitle": "Body Mind Zone",
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://i.ytimg.com/vi/CcmXERhrh5g/mqdefault_live.jpg",
           "width": 320,
         },
       },
       "title": "Deep Sleep Music",
     },
   },
 ]
 


export default function Videos({navigation}) {
const[errorMessage,setErrormessage]=useState(null);
const[ videos,setVideos]=useState(
  videoData
);
const[selectedVideo,setSelectedVideo]=useState(videoData[0]);
//  useEffect(()=>{
//    load()
//  },[])

 function onVideoSelect (video ) {
setSelectedVideo(video)
};


//   async function load() {
//     try{
//      await youtube.get("search", {
//       params: {
//         part: "snippet",
//         maxResults: 5,
//        // key:"",
//        key: "AIzaSyAGiAiIask5__JLwrKZtVkTAW0ttA4JvTQ",

//         q: "soothing music"
//       }
//     }).then(response=>{
//       setVideos(response.data.items)
//       setSelectedVideo(response.data.items[0]);
//       console.log(response.data.items)
//     });
   
//     if(response.data==undefined){
//       setErrormessage('An error occured. Please check your internet connection')
//       return;
//     }
    
    
//   }catch(error){ setErrormessage('An error occured. Please check your internet connection')
// }
//   }
 
  //const { selectedVideo, videos } = this.state;
  if(videos[0]=='null'){
return(
  <AppLoading></AppLoading>
)
  }
  else if(videos.length>0)
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.container} style={{marginTop:30}}>
    <VideoList videos={videos} onVideoSelect={onVideoSelect} navigation={navigation}/> 
      <StatusBar style="auto" />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
  else
  return(
<SafeAreaView style={styles.container}>
    
    <View style={styles.container}>
    <Text style={{textAlign:'center'}}>Check you internet and try again</Text>
    </View>
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   // marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
