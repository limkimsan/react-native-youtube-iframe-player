import { Dimensions } from 'react-native'
import { smallWidthMobile } from '../constants/screen_size_constant'
const screenWidth = Dimensions.get('screen').width

export const isShortWidthScreen = () => {
  return screenWidth <= smallWidthMobile;
}