import React from "react";
import {
    Image,
    Text,
    View,
    Button,
    Hr,
    TouchableOpacity
} from "react-native";
import * as Font from "expo-font";
import {MaterialIcons, Ionicons} from "@expo/vector-icons";
import moment from 'moment';
import {styles} from '../constants';
import * as fromPlaylist from '../constants/player.const';
import {Weather, AnimatedGradient, HomePlayer} from '../components';
import SlidingUpPanel from 'rn-sliding-up-panel';

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
                        weatherLoaded: true,
                        timeOfDay: this._getTimeOfDay(moment.unix(json.currently.time).format('HH:mm').substring(0, 2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0, 2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0, 2)),
                        isDay: this._isDayMode(moment.unix(json.currently.time).format('HH:mm').substring(0, 2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0, 2), moment.unix(json.daily.data[0].sunriseTime).format('HH:mm').substring(0, 2))
                    }
                });
            });
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
        const isDawn = Math.abs(sunUp - currentTime) <= 1;
        const isDusk = Math.abs(sunDown - currentTime) <= 1;
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


    _getWindBearing(windBearing) {
        const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
        return directions[Math.round(((windBearing %= 360) < 0 ? windBearing + 360 : windBearing) / 45) % 8];
    }

    render() {
        const textColor = this.state.weather.isDay ? '#000' : '#fff';
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
                    <View style={styles.nameContainer}>
                        <Text style={[styles.text, {
                            textTransform: 'lowercase',
                            fontFamily: "grenze-regular",
                            color: textColor,
                            fontSize: 16,
                        }]}>... {this.state.playbackInstanceName} ... </Text>
                    </View>
                </View>
                <Weather weather={this.state.weather}></Weather>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() => this._panel.show()} style={styles.bottomPanelContainer}>
                        <HomePlayer weather={this.state.weather}></HomePlayer>
                    </TouchableOpacity>
                    <SlidingUpPanel ref={c => this._panel = c}>
                        <View style={[styles.container, {backgroundColor: '#fff'}]}>
                            <Text>Here is the content inside panel</Text>
                            <TouchableOpacity onPress={() => this._panel.hide()}>
                                <Ionicons name="md-checkmark-circle" size={32} color="black" />
                            </TouchableOpacity>
                        </View>
                    </SlidingUpPanel>
                </View>
            </AnimatedGradient>
        );
    }
}
