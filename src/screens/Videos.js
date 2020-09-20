import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import youtube from '../api/youtube';
import { StyleSheet, Text, View } from 'react-native';
import VideoList from '../components/video/VideoList';

export default function Videos({navigation}) {
const[errorMessage,setErrormessage]=useState(null);
const[ videos,setVideos]=useState([]);
const[selectedVideo,setSelectedVideo]=useState(null);
 useEffect(()=>{
   load()
 },[])

 function onVideoSelect (video ) {
setSelectedVideo(video)
};


  async function load() {
    try{
     await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "Add your key",
        q: "soothing music"
      }
    }).then(response=>{
      setVideos(response.data.items)
      setSelectedVideo(response.data.items[0]);
    });
   
    if(response.data==undefined){
      setErrormessage('An error occured. Please check your internet connection')
      return;
    }
    
    
  }catch(error){ setErrormessage('An error occured. Please check your internet connection')
}
  }
 
  //const { selectedVideo, videos } = this.state;
  return (
    <View style={styles.container}>
    <VideoList videos={videos} onVideoSelect={onVideoSelect} navigation={navigation}/> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
