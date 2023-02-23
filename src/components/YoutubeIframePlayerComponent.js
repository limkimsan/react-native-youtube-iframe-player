import React, {useRef, useReducer} from 'react'
import {View} from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe"

import WarningMessageComponent from './WarningMessageComponent'
import PlayerControlsComponent from './PlayerControlsComponent'
import {UNSTARTED} from '../constants/video_constant'
import videoUtil from '../utils/video_util';

const YoutubeIframePlayerComponent = (props) => {
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
    isPlaying: true,
    isLoading: true,
    videoState: UNSTARTED
  });
  const playerRef = useRef(null)

  const renderVideoPlayer = () => {
    return <React.Fragment>
              <PlayerControlsComponent playerRef={playerRef} isPlaying={state.isPlaying} isLoading={state.isLoading} videoState={state.videoState} playPauseContainerStyle={props.playPauseContainerStyle}
                height={props.height} togglePlaying={() => setState({isPlaying: !state.isPlaying})}
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

export default YoutubeIframePlayerComponent