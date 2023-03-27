import React from 'react'
import {ActivityIndicator, TouchableOpacity, StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SliderComponent from './SliderComponent';
import color from '../constants/color_constant'

const PlayerControlsComponent = (props) => {
  return (
    <React.Fragment>
      <View style={{width: '100%', height: props.height + 10, position: 'absolute', zIndex: 1}} />
      { props.isLoading && <ActivityIndicator size="large" color={props.loadingColor || color.black} style={{position: 'absolute', zIndex: 1}} /> }
      <TouchableOpacity onPress={() => props.togglePlaying()} style={[styles.touchableContainer, {height: props.height - 20}, props.playPauseContainerStyle]} />
      { !props.isPlaying && <Icon name='play-circle-outline' size={80} color="rgba(255,255,255,0.7)" style={{position:'absolute', zIndex: 1}} />}
      { !props.isLoading &&
        <SliderComponent
          playerRef={props.playerRef}
          isPlaying={props.isPlaying}
          isLoading={props.isLoading}
          videoState={props.videoState}
          durationFontSize={props.durationFontSize}
        />
      }
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  touchableContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 10
  }
});

export default PlayerControlsComponent