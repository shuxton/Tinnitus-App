import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,ScrollView,SafeAreaView } from 'react-native';
import VideoList from '../components/video/VideoList';
import { AppLoading } from 'expo';

const videoData= [
  {
     "id":{
       "kind": "youtube#video",
       "videoId": "Cnfj6QCGLyA",
     },
     "snippet":{
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://img.youtube.com/vi/Cnfj6QCGLyA/0.jpg",
           "width": 320,
         },
       },
       "title": "Relaxing Piano and Flute Music",
     },
   },
  {
     "id":{
       "kind": "youtube#video",
       "videoId": "eXbt6B7GloE",
     },
     "snippet":{
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://img.youtube.com/vi/eXbt6B7GloE/0.jpg",
           "width": 320,
         },
       },
       "title": "Healing Music",
     },
   },
  {
     "id":{
       "kind": "youtube#video",
       "videoId": "PszSx4HvKAA",
     },
     "snippet":{
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://img.youtube.com/vi/PszSx4HvKAA/0.jpg",
           "width": 320,
         },
       },
       "title": "Meditation Music",
     },
   },
  {
     "id":{
       "kind": "youtube#video",
       "videoId": "tBGvOmUhhq4",
     },
     "snippet":{
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://img.youtube.com/vi/tBGvOmUhhq4/0.jpg",
           "width": 320,
         },
       },
       "title": "This is not the end. Inspiring speech on mental health",
     },
   },
  {
     "id":{
       "kind": "youtube#video",
       "videoId": "qv1afUOxfwU",
     },
     "snippet":{
       "thumbnails":{
         "medium":{
           "height": 180,
           "url": "https://img.youtube.com/vi/qv1afUOxfwU/0.jpg",
           "width": 320,
         },
       },
       "title": "Get over depression",
     },
   },
   {
    "id":{
      "kind": "youtube#video",
      "videoId": "Vw1_AEaoXtM",
    },
    "snippet":{
      "thumbnails":{
        "medium":{
          "height": 180,
          "url": "https://img.youtube.com/vi/Vw1_AEaoXtM/0.jpg",
          "width": 320,
        },
      },
      "title": "You are not alone. Motivational Speech",
    },
  }, {
    "id":{
      "kind": "youtube#video",
      "videoId": "nKo4jYDO9FQ",
    },
    "snippet":{
      "thumbnails":{
        "medium":{
          "height": 180,
          "url": "https://img.youtube.com/vi/nKo4jYDO9FQ/0.jpg",
          "width": 320,
        },
      },
      "title": "Powerful tinnitus sound therapy",
    },
  }
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
