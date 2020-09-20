import React from 'react';
import {View,Text} from 'react-native';
import { Grid } from "@material-ui/core";
import VideoItem from "./VideoItem";

export default function VideoList({videos,onVideoSelect,navigation}){
    const listOfVideos = videos.map((video, id) => (
        <VideoItem onVideoSelect={onVideoSelect} key={id} video={video} navigation={navigation} />
      ));
    return(
        <View>
      {listOfVideos} 
    </View>
    )
}