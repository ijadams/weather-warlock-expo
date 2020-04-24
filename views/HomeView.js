import React from "react";
import {
    Image,
    Text,
    View,
    Modal,
    Hr,
    TouchableOpacity, DeviceEventEmitter
} from "react-native";
import * as Font from "expo-font";
import {MaterialIcons, Ionicons} from "@expo/vector-icons";
import moment from 'moment';
import {styles} from '../constants';
import * as fromPlaylist from '../constants/player.const';
import {Weather, AnimatedGradient, TextBar} from '../components';
import {ArchivesView, WeatherDataView} from './index';

const LOADING_STRING = "... loading ...";

export class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.index = 0;
        this.state = {
            playbackInstanceName: fromPlaylist.PLAYLIST[this.index].name,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            fontLoaded: false,
            instrumentModalVisible: false,
            archiveModalVisible: false,
            colors: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)'],
            weather: {
                summary: LOADING_STRING,
                temperature: LOADING_STRING,
                humidity: LOADING_STRING,
                windSpeed: LOADING_STRING,
                windBearing: LOADING_STRING,
                precipProbability: LOADING_STRING,
                time: LOADING_STRING,
                pressure: LOADING_STRING,
                uvIndex: LOADING_STRING,
                weatherLoaded: false,
                timeOfDay: null,
                isDay: false
            }
        };
    }

    componentDidMount() {
        this._loadWeatherData();
        setInterval(() => {
            this._loadWeatherData();
        }, 60000);

        (async () => {
            await Font.loadAsync({
                ...MaterialIcons.font,
                "grenze-regular": require("../assets/fonts/Grenze-Regular.ttf"),
                "roboto-regular": require("../assets/fonts/Roboto-Regular.ttf"),
                "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
                "roboto-light": require("../assets/fonts/Roboto-Light.ttf")
            });
            this.setState({fontLoaded: true});
        })();

        DeviceEventEmitter.addListener("event.archive", (title) => {
            this.setState({playbackInstanceName: title});
        });
    }


    _loadWeatherData() {
        const url = `https://weather-warlock.s3.amazonaws.com/weather.json`;
        fetch(
            url
        )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    weather: {
                        res: json,
                        summary: json.currently.summary,
                        temperature: Math.floor(json.currently.temperature),
                        humidity: Math.floor(json.currently.humidity * 100),
                        windSpeed: json.currently.windSpeed,
                        windBearing: this._getWindBearing(json.currently.windBearing),
                        precipProbability: json.currently.precipProbability,
                        time: moment.unix(json.currently.time).format('h:mma'),
                        pressure: json.currently.pressure,
                        uvIndex: json.currently.uvIndex,
                        moonPhase: json.daily.data[0].moonPhase,
                        timeZone: json.timeZone,
                        weatherLoaded: true,
                        timeOfDay: this._getTimeOfDay(json.currently.time, json.daily.data[0].sunriseTime, json.daily.data[0].sunsetTime),
                        isDay: this._isDayMode(json.currently.time, json.daily.data[0].sunriseTime, json.daily.data[0].sunsetTime)
                    }
                });
            });
    }

    _isDayMode(currentTime, sunUp, sunDown) {
        return currentTime >= sunUp && currentTime <= sunDown;
    }

    _getTimeOfDay(currentTime, sunUp, sunDown) {
        if (currentTime >= sunUp && currentTime <= sunDown) {
            return 'day';
        }
        return 'night';
    }


    _getWindBearing(windBearing) {
        const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
        return directions[Math.round(((windBearing %= 360) < 0 ? windBearing + 360 : windBearing) / 45) % 8];
    }

    _setArchiveModalVis(visible) {
        this.setState({archiveModalVisible: visible});
        DeviceEventEmitter.emit('event.drawer', {});

    }

    _handleBottomDrawer() {
        const bool = !this.state.instrumentModalVisible;
        this.setState({instrumentModalVisible: bool});
        DeviceEventEmitter.emit('event.drawer', {});
    }

    render() {
        const textColor = this.state.weather.isDay ? '#000' : '#fff';
        const textColorOpposite = this.state.weather.isDay ? '#fff' : '#000';
        return !this.state.fontLoaded || !this.state.weather.weatherLoaded ? (
            <View style={styles.emptyContainer}/>
        ) : (
            <AnimatedGradient time={this.state.weather.timeOfDay} speed={this.state.weather.windSpeed}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo}
                           source={this.state.weather.isDay ? fromPlaylist.LOGO_BLACK.module : fromPlaylist.LOGO_WHITE.module}/>
                    <Text style={[styles.text, {
                        fontFamily: "grenze-regular",
                        fontSize: 24,
                        marginTop: -10,
                        marginBottom: 0,
                        color: textColor
                    }]}>
                        Weather for the Blind
                    </Text>
                    <TouchableOpacity onPress={() => this._setArchiveModalVis(true)}>
                        <View style={[styles.nameContainer, {backgroundColor: textColor, borderColor: textColorOpposite}]}>
                            <Text style={[styles.text, {
                                color: textColorOpposite,
                                fontSize: 14,
                                fontWeight: 500,
                                paddingLeft: 4,
                                paddingRight: 4,
                                letterSpacing: 0.2,
                            }]}>
                                ARCHIVES
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Weather weather={this.state.weather}></Weather>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.archiveModalVisible}>
                    <View style={[styles.container, {backgroundColor: '#fff'}]}>
                        <ArchivesView activeTrack={this.state.playbackInstanceName}/>
                        <View style={styles.downArrowContainer}>
                            <TouchableOpacity onPress={() => this._setArchiveModalVis(false)}>
                                <Ionicons name="ios-close" color="#000" size={50}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() => this._handleBottomDrawer()}
                                      style={styles.bottomPanelContainer}>
                        <TextBar weather={this.state.weather}></TextBar>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.instrumentModalVisible}>
                    <View style={[styles.container, {backgroundColor: '#fff'}]}>
                        <WeatherDataView weather={this.state.weather.res} />
                        <View style={styles.downArrowContainer}>
                            <TouchableOpacity onPress={() => this._handleBottomDrawer(false)}>
                                <Ionicons name="ios-close" color="#000" size={50}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </AnimatedGradient>
        );
    }
}
