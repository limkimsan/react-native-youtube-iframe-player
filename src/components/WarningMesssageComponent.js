import React from 'react'
import {View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import color from '../constants/color_constant';

const WarningMessageComponent = (props) => {
  const messages = {
    'no_internet': { km: 'មិនមានសេវាអ៊ីនធឺណិតដើម្បីលេងវីដេអូ', en: 'No internet connection to play the video' },
    'no_video': { km: 'មិនមានវីដេអូ', en: 'No video available' }
  }
  const error = !props.videoUrl ? { message: messages['no_video'][props.locale], icon: 'video-off-outline' } : { message: messages['no_internet'][props.locale], icon: 'wifi-off' }

  return (
    <View style={{borderWidth: 0, alignItems: 'center', marginTop: -26}}>
      <Icon name={error.icon} size={props.playIconSize || 38} color={color.lightGray} />
      <Text style={{color: color.lightGray, marginTop: 6, fontSize: props.fontSize || 14}}>{error.message}</Text>
    </View>
  )
}

export default WarningMessageComponent