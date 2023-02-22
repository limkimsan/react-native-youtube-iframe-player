import React, {useRef, useReducer} from 'react'
import {ActivityIndicator, View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe"
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import WarningMessageComponent from './WarningMessageComponent'
import PlayerControlsComponent from './PlayerControlsComponent'
// import color from '../constants/color_constant'
import {UNSTARTED} from '../constants/video_constant'
import videoUtil from '../utils/video_util';

const YoutubeIframePlayerComponent = (props) => {
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
    isPlaying: true,
    isLoading: true,
    hasInternet: true,
    videoState: UNSTARTED
  });
  const playerRef = useRef(null)

  const renderVideoPlayer = () => {
    return <React.Fragment>
              {/* { state.isLoading && <ActivityIndicator size="large" color={color.black} style={{position: 'absolute'}} /> }
              <TouchableOpacity onPress={() => setState({isPlaying: !state.isPlaying})} style={[styles.touchableContainer, {height: props.height - 20}, props.playPauseContainerStyle]} />
              { !state.isPlaying && <Icon name='play-circle-outline' size={80} color="rgba(255,255,255,0.7)" style={{position:'absolute', zIndex: 1}} />}
              { !state.isLoading &&
                <YoutubeIframePlayerSlider
                  playerRef={playerRef}
                  isPlaying={state.isPlaying}
                  isLoading={state.isLoading}
                  videoState={state.videoState}
                />
              } */}
              <PlayerControlsComponent playerRef={playerRef} isPlaying={state.isPlaying} isLoading={state.isLoading} videoState={state.videoState} playPauseContainerStyle={props.playPauseContainerStyle}
                togglePlaying={() => setState({isPlaying: !state.isPlaying})}
              />

              <YoutubePlayer
                ref={playerRef}
                height={'100%'}
                width={'100%'}
                play={state.isPlaying}
                videoId={videoUtil.getVideoId(props.videoUrl)}
                onReady={() => setState({isLoading: false})}
                initialPlayerParams={{ controls: false, rel: false }}
                onChangeState={(event) => setState({videoState: event})}
              />
           </React.Fragment>
  }

  return (
    <View style={[{height: props.height + 10, width: props.width, alignItems: 'center', justifyContent: 'center'}, props.containerStyle]}>
      { !props.hasInternet || !props.videoUrl ?
      <WarningMessageComponent videoUrl={props.videoUrl} locale={props.locale} playIconSize={props.playIconSize} fontSize={props.fontSize} />
      : renderVideoPlayer() }
    </View>
  )
}

// const styles = StyleSheet.create({
//   touchableContainer: {
//     position: 'absolute',
//     width: '100%',
//     top: 0,
//     zIndex: 2
//   }
// });

export default YoutubeIframePlayerComponent