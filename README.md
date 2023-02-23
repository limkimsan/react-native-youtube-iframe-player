# react-native-bottom-sheet-picker

React native youtube iframe player is a youtube iframe that is cloned from the react-native-youtube-iframe to solve the issue of showing the developer options when using the youtube iframe inside the pressable component.

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
| Prop               |    Default    |    Type    | Description                                                         |
| :----------------- | :-----------: | :--------: | :-------------------------------------------------------------------|
| videoUrl           |       ''      |  `string`  | The URL of the Youtube video                                        |
| height             |      210      |  `number`  | The height of the iframe                                            |
| width              |     '100%'    |  `number`  | The width of the iframe                                             |
| locale             |      'km'     |  `string`  | The locale of the warning message (`km` or `en`)                    |
| labelSize          |       14      |  `number`  | The font size of the warning message                                |
| playIconSize       |       38      |  `number`  | The size of the play icon                                           |
| loadingColor       |   '#000000'   |  `string`  | The color of the loading indicator                                  |
| durationFontSize   |       11      |  `number`  | The font size of the duration and play seconds                      |

#### Custom styles

| Prop                    |    Default    |   Type    | Description                                |
| :---------------------- | :-----------: | :-------: | :----------------------------------------- |
| containerStyle          |     {...}     |  `style`  | Style of the main container                |
| playPauseContainerStyle |     {...}     |  `style`  | Style of play/pause container              |

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
