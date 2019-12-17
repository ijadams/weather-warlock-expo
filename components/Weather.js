import React from 'react';

import {styles} from '../constants/styles.const';
import {
    View,
    Dimensions,
    ScrollView,
    Text,
    StyleSheet, Image, TouchableHighlight
} from "react-native";

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");

import moment from 'moment-timezone';
import * as fromPlaylist from "../constants/player.const";

export class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment.tz("America/Chicago").format('HH:mm'),
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: moment.tz("America/Chicago").format('HH:mm'),
            });
        }, 1000);
    }

    render() {
        const textColor = this.props.weather.isDay ? '#000' : '#fff';
        const subTextColor = this.props.weather.isDay ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';
        const iconPauseButton = this.props.weather.isDay ? fromPlaylist.ICON_PAUSE_BUTTON.module : fromPlaylist.ICON_PAUSE_BUTTON_WHITE.module;
        const iconPlayButton = this.props.weather.isDay ? fromPlaylist.ICON_PLAY_BUTTON.module : fromPlaylist.ICON_PLAY_BUTTON_WHITE.module;
        return (
            <View style={weatherStyles.weatherContainer}>
                <View style={weatherStyles.circle}>
                    <View style={[weatherStyles.circleFill]}>
                    </View>
                    <View style={[weatherStyles.circleTextContainer]}>
                        <Text style={[styles.circleText, {
                                textAlign: 'center',
                                fontFamily: "grenze-regular",
                                fontSize: 100,
                                letterSpacing: -3,
                                paddingLeft: 20,
                                color: textColor
                                }]}>
                                {this.props.weather.temperature}°
                        </Text>
                    </View>
                </View>
                <Text style={[styles.text, {
                    fontFamily: "grenze-regular",
                    fontSize: 20,
                    textAlign: "center",
                    letterSpacing: 1,
                    marginBottom: 6,
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
                <View style={weatherStyles.container}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        maxWidth: '100%',
        justifyContent: 'center',
        height: 50,
        borderColor: 'rgba(255,255,255,.20)',
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    text: {
        color: 'rgba(0,0,0,0.8)',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 12,
        marginRight: 12,
        marginLeft: 12
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
        borderWidth: 2,
        borderColor: '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 15
      },
      circleFill: {
        backgroundColor: '#f39c12',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        zIndex: 0,
        height: '100%'
      },
      circleText: {
          backgroundColor: 'transparent'
      },
      circleTextContainer: {
          position: 'absolute',
          zIndex: 0,
          bottom: 10,
          backgroundColor: 'rgba(0,0,0,0)',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'center'
      }
});
