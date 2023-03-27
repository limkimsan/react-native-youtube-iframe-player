import React, {useEffect, useRef, useReducer} from 'react'
import {View} from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe"
import NetInfo from '@react-native-community/netinfo'

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
    videoState: UNSTARTED,
  });
  const [hasInternet, setHasInternet] = React.useState(true)
  const playerRef = useRef(null)
  const hasInternetRef = useRef(true);
  const isLoadingRef = useRef(state.isLoading);
  let timeout = null
  const height = videoUtil.getContainerHeight(props.height, props.isTablet)

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (hasInternet != state.isConnected)
        setHasInternet(state.isConnected)
    });

    hasInternetRef.current = hasInternet
    isLoadingRef.current = true
    timeout = setTimeout(() => {
      setHasInternet(hasInternetRef.current && !isLoadingRef.current)
    }, 25000);

    return () => !!timeout && clearTimeout(timeout)
  }, [])

  const onReady = () => {
    setState({isLoading: false});
    isLoadingRef.current = false;
    !!props.onReady && props.onReady();
  }

  const renderVideoPlayer = () => {
    return <React.Fragment>
              <PlayerControlsComponent playerRef={playerRef} isPlaying={state.isPlaying} isLoading={state.isLoading} videoState={state.videoState} playPauseContainerStyle={props.playPauseContainerStyle}
                height={height} loadingColor={props.loadingColor} durationFontSize={props.durationFontSize} togglePlaying={() => setState({isPlaying: !state.isPlaying})}
              />
              <YoutubePlayer
                ref={playerRef}
                height={'100%'}
                width={'100%'}
                play={state.isPlaying}
                videoId={videoUtil.getVideoId(props.videoUrl)}
                onReady={() => onReady()}
                initialPlayerParams={{ controls: false, rel: false }}
                onChangeState={(event) => setState({videoState: event})}
              />
           </React.Fragment>
  }

  return (
    <View style={[{height: height + 10, width: props.width || '100%', alignItems: 'center', justifyContent: 'center'}, props.containerStyle]}>
      { !hasInternet || !props.videoUrl ?
      <WarningMessageComponent videoUrl={props.videoUrl} locale={props.locale || 'km'} playIconSize={props.playIconSize} labelSize={props.labelSize} />
      : renderVideoPlayer() }
    </View>
  )
}

export default YoutubeIframePlayerComponent