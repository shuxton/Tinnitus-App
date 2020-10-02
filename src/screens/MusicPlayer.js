import React,{useEffect,useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

const audioBookPlaylist = [
	{
		title: "You aren't alone. We are in this together",
		uri:
			require('../../assets/white.mp3'),
		imageSource:Image.resolveAssetSource(require('../../assets/sound.png')).uri
	},
	{
		title: 'Music therapy is the best!',
		uri:
			require('../../assets/pink.mp3'),
		imageSource: Image.resolveAssetSource(require('../../assets/sound.png')).uri
	},
	{
		title: 'Close your eyes and take deep breaths',
		uri: require('../../assets/ocean.mp3'),
		imageSource: Image.resolveAssetSource(require('../../assets/sound.png')).uri
	},
	{
		title: 'Remeber your best memories',
		uri:
			require('../../assets/rain.mp3'),
		imageSource: Image.resolveAssetSource(require('../../assets/sound.png')).uri
	},
]

export default function music() {

	const[isPlaying,setIsPlaying]=useState(false)
	const[playbackInstance,setPlaybackInstance]=useState(null)
	const[currentIndex,setCurrentIndex]=useState(0)
	const[volume,setVolume]=useState(1.0)
	const[isBuffering,setIsBuffering]=useState(true)
	// state = {
	// 	isPlaying: false,
	// 	playbackInstance: null,
	// 	currentIndex: 0,
	// 	volume: 1.0,
	// 	isBuffering: true
	// }

useEffect(()=>{
	Audio.setAudioModeAsync({
		allowsRecordingIOS: false,
		interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		playsInSilentModeIOS: true,
		interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		shouldDuckAndroid: true,
		staysActiveInBackground: true,
		playThroughEarpieceAndroid: true
	})
	loadAudio()
},[])



	async function loadAudio() {
		//const { currentIndex, isPlaying, volume } = this.state

		try {
			const PlaybackInstance = new Audio.Sound()
			const source = 
				 audioBookPlaylist[currentIndex].uri
			

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			PlaybackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
			await PlaybackInstance.loadAsync(source, status, false)
				setPlaybackInstance(PlaybackInstance)
			playbackInstance.setIsLoopingAsync(true)
		} catch (e) {
			console.log(e)
		}
	}

	const onPlaybackStatusUpdate = status => {
		setIsBuffering(status.isBuffering)
	}

	const handlePlayPause = async () => {
		if(isPlaying){
			await playbackInstance.pauseAsync().then(res=>{
				setIsPlaying(!isPlaying)
			})
		}
		else{
			await playbackInstance.playAsync().then(res=>{
				setIsPlaying(!isPlaying)
			})
		}
		

	}

 const	handlePreviousTrack = async () => {
		if (playbackInstance) {
			console.log("yo")
			await playbackInstance.unloadAsync().then(res=>{
				setCurrentIndex((currentIndex === 0 ? audioBookPlaylist.length -1 : currentIndex-1))
				console.log("1")
			})
			console.log("2")
			loadAudio()
			
		}
	}

const	handleNextTrack = async () => {
		
		if (playbackInstance) {
			await playbackInstance.unloadAsync().then(res=>{
				setCurrentIndex((currentIndex+1 > audioBookPlaylist.length - 1 ? 0 : currentIndex+1))
			})
			loadAudio()

			
			
		}
	}


	
		return (
			<View style={styles.container}>
				<Image
					style={styles.albumCover}
					source={ {uri:audioBookPlaylist[currentIndex].imageSource}}
				/>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} onPress={handlePreviousTrack}>
						<Ionicons name='ios-skip-backward' size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={handlePlayPause}>
						{isPlaying ? (
							<Ionicons name='ios-pause' size={48} color='#444' />
						) : (
							<Ionicons name='ios-play-circle' size={48} color='#444' />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={handleNextTrack}>
						<Ionicons name='ios-skip-forward' size={48} color='#444' />
					</TouchableOpacity>
				</View>
				{playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{audioBookPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					(Please use earphones)
				</Text>
				
			</View>
		) : null}
			</View>
		)
	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: 250,
		height: 250
	},
	trackInfo: {
		padding: 40,
		backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	}
})