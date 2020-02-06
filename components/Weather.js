import React from 'react';
import moment from 'moment-timezone';
import {styles} from '../constants/styles.const';
import {
    View,
    DeviceEventEmitter,
    ScrollView,
    Text,
    StyleSheet
} from "react-native";

export class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment.tz(this.props.weather.timeZone).format('HH:mm'),
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: moment.tz(this.props.weather.timeZone).format('HH:mm'),
            });
        }, 1000);
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

    render() {

        const textColor = this.props.weather.isDay ? '#000' : '#fff';
        const borderColor = this.props.weather.isDay ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)';
        const subTextColor = this.props.weather.isDay ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';
        const circleFillColor = this.props.weather.isDay ? '#f39c12' : 'rgb(254, 250, 212)';
        const circleTextColor = this.props.weather.isDay ? '#000' : '#808e9b';
        const moonPhase = this.props.weather.moonPhase;

        return (
            <View style={weatherStyles.weatherContainer}>
                <View style={[weatherStyles.circle, {borderColor: circleTextColor}]}>
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
