import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {Slider} from '@miblanchard/react-native-slider'
import color from '../constants/color_constant'
import {BUFFERING, ENDED} from '../constants/video_constant'
import videoUtil from '../utils/video_util';

class YoutubeIframePlayerSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: 0,
      playSeconds: 0,
      thumbSize: 12,
      showDuration: false,
    }
    this.countInterval = null
  }

  async componentDidMount() {
    this.setState({ duration: await this.props.playerRef.current?.getDuration() })
    this.countPlaySeconds()
  }

  componentWillUnmount() {
    !!this.countInterval && clearInterval(this.countInterval)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isPlaying != this.props.isPlaying && !this.props.isPlaying)
      !!this.countInterval && clearInterval(this.countInterval)
    else if (prevProps.isPlaying != this.props.isPlaying && this.props.isPlaying)
      this.countPlaySeconds()
  }

  countPlaySeconds() {
    this.countInterval = setInterval(() => {
      if (this.props.videoState != BUFFERING)
        this.setState({playSeconds: this.state.playSeconds + 1})

      if (this.props.videoState == ENDED)
        clearInterval(this.countInterval)
    }, 1000)
  }

  onSlidingComplete(value) {
    this.setState({
      thumbSize: 12,
      playSeconds: parseFloat(value),
    }, () => this.countPlaySeconds())

    setTimeout(() => this.setState({showDuration: false}), 2000)
    this.props.playerRef.current?.seekTo(value, true)
  }

  onSlidingStart() {
    !!this.countInterval && clearInterval(this.countInterval)
    this.setState({thumbSize: 18, showDuration: true})
  }

  render() {
    if (!this.props.isPlaying) return <View/>

    return (
      <View style={styles.sliderContainer}>
        <View style={{marginLeft: 8, height: 21, position: 'absolute', zIndex: 1, top: -8}}>
          {this.state.showDuration && <Text style={{fontSize: this.props.durationFontSize || 11, color: 'white'}}>{videoUtil.getFormattedPlaySeconds(this.state.playSeconds)} / {videoUtil.getFormattedPlaySeconds(this.state.duration)}</Text>}
        </View>
        <Slider
          value={this.state.playSeconds}
          disabled={this.state.playSeconds == this.state.duration}
          minimumValue={0}
          maximumValue={this.state.duration}
          maximumTrackTintColor={color.lightGrayColor}
          minimumTrackTintColor='#FF0000'
          trackClickable={true}
          containerStyle={{height: '100%', marginTop: 7}}
          thumbTouchSize={{height: 50}}
          thumbStyle={{backgroundColor: color.red, width: this.state.thumbSize, height: this.state.thumbSize }}
          trackStyle={{height: this.state.thumbSize > 12 ? 6 : 4}}
          onSlidingComplete={(value) => this.onSlidingComplete(value)}
          onSlidingStart={(value) => this.onSlidingStart()}
          onValueChange={(value) => this.setState({playSeconds: parseFloat(value)})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    bottom: -15,
    position: 'absolute',
    height: 46,
    width: '100%',
    zIndex: 20
  }
});

export default YoutubeIframePlayerSlider;