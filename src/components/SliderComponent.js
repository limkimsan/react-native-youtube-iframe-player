import React, {useEffect, useReducer} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Slider} from '@miblanchard/react-native-slider'
import color from '../constants/color_constant'
import {BUFFERING, ENDED} from '../constants/video_constant'
import videoUtil from '../utils/video_util';

const SliderComponent = (props) => {
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
    duration: 0,
      playSeconds: 0,
      thumbSize: 12,
      showDuration: false,
  });
  let countInterval = null

  useEffect(() => {
    const init = async () => {
      setState({ duration: await props.playerRef.current?.getDuration() })
      countPlaySeconds()
    }
    init()
  }, [])

  const countPlaySeconds = () => {
    countInterval = setInterval(() => {
      if (props.videoState != BUFFERING)
        setState({playSeconds: state.playSeconds + 1})
      else if (props.videoState == ENDED)
        clearInterval(countInterval)
    }, 1000)
  }

  if (!props.isPlaying) return <View/>

  return (
    <View style={styles.sliderContainer}>
      <View style={{marginLeft: 8, height: 21}}>
        {state.showDuration && <Text style={{fontSize: 11, color: color.white}}>{videoUtil.getFormattedPlaySeconds(state.playSeconds)} / {videoUtil.getFormattedPlaySeconds(state.duration)}</Text>}
      </View>
      <Slider
        value={state.playSeconds}
        disabled={state.playSeconds == state.duration}
        minimumValue={0}
        maximumValue={state.duration}
        maximumTrackTintColor={color.lightGray}
        minimumTrackTintColor='#FF0000'
        trackClickable={true}
        containerStyle={{height: 20}}
        thumbTouchSize={{ width: 48, height: 48 }}
        thumbStyle={{backgroundColor: '#FF0000', width: state.thumbSize, height: state.thumbSize }}
        trackStyle={{height: state.thumbSize > 12 ? 6 : 4}}
        onSlidingComplete={(value) => onSlidingComplete(value)}
        onSlidingStart={(value) => onSlidingStart()}
        onValueChange={(value) => setState({playSeconds: parseFloat(value)})}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    bottom: 10,
    position: 'absolute',
    height: 38,
    width: '100%',
    zIndex: 5,
  }
});

export default SliderComponent