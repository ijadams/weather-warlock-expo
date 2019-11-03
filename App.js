import React from "react";
import {
  Dimensions,
  Image,
  Slider,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { Audio, Video } from "expo-av";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import moment from 'moment';
import {styles} from './constants';
import * as fromPlaylist from './constants/player.const';
import {Weather} from './components';
import {AnimatedGradient} from './components/AnimatedGradient';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.playbackInstance = null;
    this.state = {
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      loopingType: fromPlaylist.LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      weatherLoaded: false,
      summary: LOADING_STRING,
      temperature: LOADING_STRING,
      humidity: LOADING_STRING,
      windSpeed: LOADING_STRING,
      windBearing: LOADING_STRING,
      precipProbability: LOADING_STRING,
      time: LOADING_STRING,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false,
      colors: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)'],
      isDay: false
    };
  }

  componentDidMount() {
    this._loadWeatherData();
    setInterval(() => {
       this._loadWeatherData();
     }, 60000 );

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    (async () => {
      await Font.loadAsync({
        ...MaterialIcons.font,
        "grenze-regular": require("./assets/fonts/Grenze-Regular.ttf"),
        "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
        "roboto-light": require("./assets/fonts/Roboto-Light.ttf")
      });
      this.setState({ fontLoaded: true });
    })();
  }

  _loadWeatherData() {
    const url = `https://weather-warlock.s3.amazonaws.com/weather.json`;
    fetch(
      url
    )
      .then(res => res.json())
      .then(json => {

        this.setState({
          summary: json.currently.summary,
          temperature: Math.floor(json.currently.temperature),
          humidity: json.currently.humidity * 100,
          windSpeed: json.currently.windSpeed,
          windBearing: this._getWindBearing(json.currently.windBearing),
          precipProbability: json.currently.precipProbability,
          time: moment.unix(json.currently.time).format('h:mma'),
          pressure: json.currently.pressure,
          uvIndex: json.currently.uvIndex,
          weatherLoaded: true,
          timeOfDay: this._getTimeOfDay(moment.unix(json.currently.time).format('HH:mm').substring(0,2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0,2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0,2)),
          isDay: this._isDayMode(moment.unix(json.currently.time).format('HH:mm').substring(0,2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0,2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0,2))
        });
        this._updateScreenForLoading();
      });
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = { uri: fromPlaylist.PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === fromPlaylist.LOOPING_TYPE_ONE
    };

    if (fromPlaylist.PLAYLIST[this.index].isVideo) {
      await this._video.loadAsync(source, initialStatus);
      // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
    } else {
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }

  _isDayMode(currentTime, sunUp, sunDown) {
    currentTime = Number(currentTime);
    sunUp = Number(sunUp);
    sunDown = Number(sunDown) + 12;
    return currentTime >= sunUp && currentTime <= sunDown;
  }

  _getTimeOfDay(currentTime, sunUp, sunDown) {
    currentTime = Number(currentTime);
    sunUp = Number(sunUp);
    sunDown = Number(sunDown) + 12;
    const isDayTime = currentTime >= sunUp && currentTime <= sunDown;
    const isDawn = Math.abs(sunUp - currentTime) <= 2;
    const isDusk = Math.abs(sunDown - currentTime) <= 2;
    if (isDawn) {
      return 'dawn';
    }
    if (isDusk) {
      return 'dusk';
    }
    if (isDayTime) {
      return 'day';
    }
    return 'night';
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true
      });
    } else {
      this.setState({
        playbackInstanceName: fromPlaylist.PLAYLIST[this.index].name,
        showVideo: fromPlaylist.PLAYLIST[this.index].isVideo,
        isLoading: false
      });
    }
  }

  _getWindBearing(windBearing) {
      const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
      return directions[Math.round(((windBearing %= 360) < 0 ? windBearing + 360 : windBearing) / 45) % 8];
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : fromPlaylist.LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch
      });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth:
          (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight:
          (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
      });
    }
  };

  _onFullscreenUpdate = event => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : fromPlaylist.PLAYLIST.length - 1)) % fromPlaylist.PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  render() {
    const textColor = this.state.isDay ? '#000' : '#fff';
    const iconPauseButton = this.state.isDay ? fromPlaylist.ICON_PAUSE_BUTTON.module : fromPlaylist.ICON_PAUSE_BUTTON_WHITE.module;
    const iconPlayButton = this.state.isDay ? fromPlaylist.ICON_PLAY_BUTTON.module : fromPlaylist.ICON_PLAY_BUTTON_WHITE.module;
    return !this.state.fontLoaded || !this.state.weatherLoaded ? (
      <View style={styles.emptyContainer} />
    ) : (
        <AnimatedGradient time={this.state.timeOfDay} speed={this.state.windSpeed}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={this.state.isDay ? fromPlaylist.LOGO_BLACK.module : fromPlaylist.LOGO_WHITE.module}/>
            <Text style={[styles.text, {fontFamily: "grenze-regular", fontSize: 24, marginTop: -10, marginBottom: 0, color: textColor}]}>
                Weather for the Blind
            </Text>
          </View>
        <Weather weather={this.state}></Weather>
        <View style={styles.videoContainer}>
        <View style={styles.nameContainer}>
          <Text style={[styles.text, {fontFamily: "grenze-regular", color: textColor, fontSize: 16}]}>... {this.state.playbackInstanceName} ...</Text>
        </View>
          <Video
            ref={this._mountVideo}
            style={[
              styles.video,
              {
                opacity: this.state.showVideo ? 1.0 : 0.0,
              }
            ]}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
        </View>
          <View style={styles.timestampRow}>
              <Text
                  style={[
                      styles.text,
                      styles.buffering,
                      {fontFamily: "roboto-regular", color: textColor}
                  ]}
              >
                  {this.state.isBuffering ? BUFFERING_STRING : ""}
              </Text>
              <Text
                  style={[
                      styles.text,
                      styles.timestamp,
                      {fontFamily: "roboto-regular"}
                  ]}
              >
                  {this._getTimestamp()}
              </Text>
          </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerTopRow,
            {
              opacity: this.state.isLoading ? styles.DISABLED_OPACITY : 1.0
            }
          ]}
        >
          <TouchableHighlight
            underlayColor={'rgba(0,0,0,0)'}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}
          >
            <Image
              style={styles.button}
              source={
                this.state.isPlaying
                  ? iconPauseButton
                  : iconPlayButton
              }
            />
          </TouchableHighlight>
        </View>
      </AnimatedGradient>
    );
  }
}
