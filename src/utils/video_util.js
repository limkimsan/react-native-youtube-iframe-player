import {isShortWidthScreen} from './responsive_util';

const videoUtil = (() => {
  return {
    getVideoId,
    getFormattedPlaySeconds,
    getContainerHeight
  }

  function getVideoId(url) {
    const result = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    const videoIdWithParams = result[2]

    if (videoIdWithParams !== undefined) {
      const cleanVideoId = videoIdWithParams.split(/[^0-9a-z_-]/i)[0]
      return cleanVideoId
    }
    return null
  }

  function getFormattedPlaySeconds(seconds = 0) {
    return new Date(Math.round(seconds) * 1000).toISOString().substr(14, 5)
  }

  function getContainerHeight(heightProps, isTablet) {
    let height = !!heightProps ? heightProps : isTablet ? 320 : 210
    if (isShortWidthScreen())
      height = height - 20

    return height
  }
})()

export default videoUtil