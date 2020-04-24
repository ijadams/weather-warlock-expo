import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    TouchableHighlight,
    View,
    Slider,
    Text
} from "react-native";
import {Audio, Video} from "expo-av";
import {styles} from '../constants';
import * as fromPlaylist from '../constants/player.const';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;


export class InstrumentPlayer extends React.Component {
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
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
        });
    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance = null;
        }

        const source = {uri: this.props.path};
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
                // console.log(`FATAL PLAYER ERROR: ${status.error}`);
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
    _onError() {
        alert('There was an issue loading on of the instruments');
    }
    _getTimestamp() {
        return this.playbackInstance !== null;
    }

    _onVolumeSliderValueChange = value => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setVolumeAsync(value);
        }
    };

    render() {
        const iconPauseButton = fromPlaylist.ICON_PAUSE_BUTTON.module;
        const iconPlayButton = fromPlaylist.ICON_PLAY_BUTTON.module;
        const bgColor = this.state.isPlaying ? 'rgba(243,193,18, 0.1)' : 'rgba(25,25,25,0.1)';
        const bottomBorder = this.props.last ? 2 : 0;
        return (
            <View style={[playerStyles.playerContainer, {backgroundColor: bgColor, borderBottomWidth: bottomBorder}]}>
                <View style={playerStyles.third}>
                    <Text style={playerStyles.trackTitle}>{this.props.title}</Text>
                </View>
                <View
                    style={[
                        playerStyles.buttonsContainerBase,
                        {
                            opacity: this.state.isLoading ? 0.5 : 1.0
                        }
                    ]}
                >
                    <TouchableHighlight
                        underlayColor={'rgba(0,0,0,0)'}
                        style={playerStyles.wrapper}
                        onPress={this._onPlayPausePressed}
                        disabled={this.state.isLoading}
                    >
                        <Image
                            style={[playerStyles.button, {
                                opacity: this._getTimestamp() ? 1 : 0.5
                            }]}
                            source={
                                this.state.isPlaying
                                    ? iconPauseButton
                                    : iconPlayButton
                            }
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.videoContainer}>
                    <Video
                        ref={this._mountVideo}
                        style={[
                            styles.video,
                            {
                                opacity: this.state.showVideo ? 1.0 : 0.0,
                            }
                        ]}
                        isLooping={true}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                        onError={this._onError}
                        onReadyForDisplay={this._onReadyForDisplay}
                    />
                </View>
                <View style={playerStyles.volumeContainer}>
                    <Slider
                        style={playerStyles.volumeSlider}
                        value={1}
                        onValueChange={this._onVolumeSliderValueChange}
                        thumbTintColor="#000"
                        minimumTrackTintColor="#000"></Slider>
                </View>
            </View>
        )
    }
}


const playerStyles = StyleSheet.create({
    buttonsContainerBase: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '12%'
    },
    third: {
        width: '32%',
    },
    trackTitle: {
        fontFamily: "roboto-regular"
    },
    playerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between',
        width: '100%',
        borderStyle: 'solid',
        borderTopWidth: 2,
        borderColor: 'rgba(0,0,0,0.25)',
        padding: 10
    },
    wrapper: {},
    button: {
        width: 25,
        height: 25
    },
    volumeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: '56%',
        maxWidth: '56%'
    },
    volumeSlider: {
        width: '100%'
    },
});

