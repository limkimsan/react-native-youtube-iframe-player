React native youtube iframe player is a youtube iframe that is cloned from the react-native-youtube-iframe library that solves the issue of showing the developer options when pressing on the iframe if using the youtube iframe inside the pressable component.

## Support
iOS & Android

## Installation

```sh
npm install react-native-youtube-iframe-player
```

## Installing dependencies
```sh
npm install react-native-vector-icons react-native-youtube-iframe react-native-webview @miblanchard/react-native-slider @react-native-community/netinfo
```

- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-youtube-iframe](https://github.com/LonelyCpp/react-native-youtube-iframe)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)
- [@miblanchard/react-native-slider](https://github.com/miblanchard/react-native-slider)
- [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo)

#### Note:
You need to make configuration on iOS and Android by following the instruction from the above dependencies libraries.

## Usage

```js
import YoutubeIframePlayer from 'react-native-youtube-iframe-player';

// ...

<YoutubeIframePlayer
    videoUrl='https://www.youtube.com/watch?v=f7OPcDX_LyI&t=3s'
    height={210}
    width='100%'
    locale='km'
    durationFontSize={15}
/>
```

## Properties

#### Basic
| Prop               |    Default    |    Type    |  Optional  | Description                                                         |
| :----------------- | :-----------: | :--------: | :--------: | :-------------------------------------------------------------------|
| videoUrl           |       ''      |  `string`  |   `false`  | The URL of the Youtube video                                        |
| height             |      210      |  `number`  |   `true`   | The height of the iframe                                            |
| width              |     '100%'    |  `number`  |   `true`   | The width of the iframe                                             |
| locale             |      'km'     |  `string`  |   `false`  | The locale of the warning message (`km` or `en`)                    |
| labelSize          |       14      |  `number`  |   `true`   | The font size of the warning message                                |
| playIconSize       |       38      |  `number`  |   `true`   | The size of the play icon                                           |
| loadingColor       |   '#000000'   |  `string`  |   `true`   | The color of the loading indicator                                  |
| durationFontSize   |       11      |  `number`  |   `true`   | The font size of the duration and play seconds                      |
| isTablet           |     false     |  `boolean` |   `true`   | The device is a tablet or mobile                                    |

#### Note:
The default height is 320dp (tablet), 210dp (mobile), and 190dp (small width mobile)

#### Custom styles

| Prop                    |    Default    |   Type    | Description                                |
| :---------------------- | :-----------: | :-------: | :----------------------------------------- |
| containerStyle          |     {...}     |  `style`  | Style of the main container                |
| playPauseContainerStyle |     {...}     |  `style`  | Style of play/pause container              |

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
