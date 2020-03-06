import React from 'react';
import moment from 'moment-timezone';
import {styles} from '../constants/styles.const';
import {
    View,
    DeviceEventEmitter,
    ScrollView,
    Text,
    StyleSheet, Image, TouchableHighlight, Dimensions
} from "react-native";
import * as fromPlaylist from "../constants/player.const";
import {Audio, Video} from "expo-av";
import {Asset} from "expo-asset";
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;

export class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);

        this.index = 0;
        this.playbackInstance = null;
        this.tracks = [
            {title: 'Sleep', path: Asset.fromModule(require('../assets/audio/sleep.mp3')).uri},
            {title: 'Relax', path: Asset.fromModule(require('../assets/audio/relax.mp3')).uri},
            {title: 'Work', path: Asset.fromModule(require('../assets/audio/work.mp3')).uri},
            {title: 'Storm', path: Asset.fromModule(require('../assets/audio/storm.mp3')).uri},
            {title: 'Sunrise', path: Asset.fromModule(require('../assets/audio/sunrise.mp3')).uri},
        ];
        this.state = {
            time: moment.tz(this.props.weather.timeZone).format('HH:mm'),
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
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            videoWidth: DEVICE_WIDTH,
            videoHeight: VIDEO_CONTAINER_HEIGHT,
            poster: false,
            useNativeControls: false,
            fullscreen: false,
            throughEarpiece: false
        };
    }

    componentDidMount() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });
        setInterval(() => {
            this.setState({
                time: moment.tz(this.props.weather.timeZone).format('HH:mm'),
            });
        }, 1000);

        DeviceEventEmitter.addListener("event.archive", (e) => {
            this._loadNewPlaybackArchiveInstance(e)
        });
    }

    getCircleFillWidth(moonPhase) {
        if (this.props.weather.isDay) {
            return '100%';
        }
        if (moonPhase === 1) {
            return '0%';
        }
        if (moonPhase <= 0.5) {
            return parseFloat(moonPhase * 200).toFixed(0) + "%";
        }
        return '100%';
    }

    getCircleFillLeft(moonPhase) {
        if (this.props.weather.isDay) {
            return '0%';
        }
        if (moonPhase > 0.5 && moonPhase < 1) {
            return parseFloat(moonPhase * 100).toFixed(0) + "%";
        }
        return '0%';
    }

    handleScroll() {
        DeviceEventEmitter.emit('event.weatherScroll', {});
    }

    async _loadNewPlaybackInstance(playing, title) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance = null;
        }

        const source = title ? {uri: this.tracks.filter(i => i.title.toLowerCase() === title.toLowerCase())[0].path } : {uri: fromPlaylist.PLAYLIST[this.index].uri};
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
            this.playbackInstance = this._video;
            const status = await this._video.getStatusAsync();
        } else {
            const {sound, status} = await Audio.Sound.createAsync(
                source,
                initialStatus,
                this._onPlaybackStatusUpdate
            );
            this.playbackInstance = sound;
        }

        this._updateScreenForLoading(false);
    }

    async _loadNewPlaybackArchiveInstance(title) {
        if (title === 'live') {
           this._loadNewPlaybackInstance(this.state.isPlaying);
        } else {
          this._loadNewPlaybackInstance(this.state.isPlaying, title)
        }
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

    render() {

        const textColor = this.props.weather.isDay ? '#000' : '#fff';
        const borderColor = this.props.weather.isDay ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
        const subTextColor = this.props.weather.isDay ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';
        const circleFillColor = this.props.weather.isDay ? '#f39c12' : 'rgb(254, 250, 212)';
        const circleTextColor = this.props.weather.isDay ? '#000' : '#808e9b';
        const moonPhase = this.props.weather.moonPhase;
        const iconPauseButton = this.props.weather.isDay ? fromPlaylist.ICON_PAUSE_BUTTON.module : fromPlaylist.ICON_PAUSE_BUTTON_WHITE.module;
        const iconPlayButton = this.props.weather.isDay ? fromPlaylist.ICON_PLAY_BUTTON.module : fromPlaylist.ICON_PLAY_BUTTON_WHITE.module;
        const opac = this.state.isLoading ? 0.5 : 1.0;

        return (
            <View style={weatherStyles.weatherContainer}>
                <TouchableHighlight underlayColor={'rgba(0,0,0,0)'}
                                    onPress={this._onPlayPausePressed}
                                    disabled={this.state.isLoading}>
                    <View style={[weatherStyles.circle, {borderColor: circleTextColor, opacity: opac}]}>
                        <View style={[weatherStyles.circleFill, {
                            backgroundColor: circleFillColor,
                            width: this.getCircleFillWidth(moonPhase),
                            left: this.getCircleFillLeft(moonPhase),
                        }]}>
                        </View>
                        <View style={[weatherStyles.circleTextContainer]}>
                            <Text style={[styles.circleText, {
                                textAlign: 'center',
                                fontFamily: "grenze-regular",
                                fontSize: 100,
                                letterSpacing: -3,
                                paddingLeft: 20,
                                color: circleTextColor
                            }]}>
                                {this.props.weather.temperature}°
                            </Text>
                            <View style={[weatherStyles.playButtonContainer]}>
                                <Image
                                    style={[weatherStyles.playButton, {
                                        opacity: opac
                                    }]}
                                    source={
                                        this.state.isPlaying
                                            ? iconPauseButton
                                            : iconPlayButton
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
                <Text style={[styles.text, {
                    fontFamily: "grenze-regular",
                    fontSize: 20,
                    textAlign: "center",
                    letterSpacing: 1,
                    marginBottom: 12,
                    marginTop: 12,
                    color: textColor
                }]}>
                    New Orleans, LA
                    <Text style={[weatherStyles.subText, {
                        fontFamily: "grenze-regular",
                        fontSize: 18,
                        textAlign: "center",
                        color: textColor
                    }]}>
                        {'\n'}{this.state.time}
                    </Text>
                </Text>
                <View style={[weatherStyles.container, {borderColor: borderColor}]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} onScroll={e => this.handleScroll(e)}
                                scrollEventThrottle={16}>
                        <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                            Conditions
                            <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                                {'\n'}{this.props.weather.summary}
                            </Text>
                        </Text>
                        <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                            Humidity
                            <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                                {'\n'}{this.props.weather.humidity}%
                            </Text>
                        </Text>
                        <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                            Wind Speed
                            <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                                {'\n'}{this.props.weather.windSpeed}mph
                            </Text>
                        </Text>
                        <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                            Percipitation
                            <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                                {'\n'}{this.props.weather.precipProbability}%
                            </Text>
                        </Text>
                        <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                            Wind
                            <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                                {'\n'}{this.props.weather.windBearing}
                            </Text>
                        </Text>
                        <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                            Pressure
                            <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                                {'\n'}{this.props.weather.pressure}mb
                            </Text>
                        </Text>
                        <Text style={[weatherStyles.text, {fontFamily: "roboto-light", color: textColor}]}>
                            UV Index
                            <Text style={[weatherStyles.subText, {fontFamily: "roboto-regular", color: subTextColor}]}>
                                {'\n'}{this.props.weather.uvIndex}
                            </Text>
                        </Text>
                    </ScrollView>
                </View>
                <View>
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
            </View>
        );
    }
}

const weatherStyles = StyleSheet.create({
    weatherContainer: {
        height: 'auto',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    wrapper: {
        alignSelf: 'center',
        textAlign: 'center'
    },
    button: {
        width: 25,
        height: 30,
        resizeMode: 'stretch',
    },
    logo: {
        backgroundColor: "transparent",
        marginTop: 36,
        marginBottom: 12,
        width: 140,
        height: 32
    },
    container: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        maxWidth: '100%',
        justifyContent: 'center',
        height: 50,
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    text: {
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 12,
        marginRight: 8,
        marginLeft: 8
    },
    item: {
        width: '100%',
        textAlign: 'center'
    },
    subText: {
        fontSize: 14,
        color: 'rgba(0,0,0,1)'
    },
    circle: {
        width: 196,
        height: 196,
        borderRadius: 196 / 2,
        borderWidth: 3,
        overflow: 'hidden',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    circleFill: {
        bottom: 0,
        position: 'absolute',
        zIndex: 0,
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    circleText: {
        backgroundColor: 'transparent'
    },
    playButtonContainer: {
        position: 'absolute',
        left: 88.5,
        bottom: 10,
        zIndex: 3,
        width: '100%',
    },
    playButton: {
        width: 25,
        height: 25
    },
    circleTextContainer: {
        position: 'absolute',
        zIndex: 0,
        bottom: 7,
        marginLeft: -5,
        backgroundColor: 'rgba(0,0,0,0)',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    }
});
